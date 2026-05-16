"use client";

import type { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { clearDemoSession, readDemoSession, writeDemoSession, type DemoSessionPayload } from "@/lib/auth/demo-session";
import { clearDemoActionCount } from "@/lib/feature-gates";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { loadUserPreferences, upsertProfileForUser } from "@/src/lib/database";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  demoSession: DemoSessionPayload | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  enableDemoLogin: () => void;
  openLoginModal: (nextPath?: string) => void;
  closeLoginModal: () => void;
  loginModalOpen: boolean;
  loginNextPath: string;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const supabaseConfigured = useMemo(() => isSupabaseConfigured(), []);
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [demoSession, setDemoSessionState] = useState<DemoSessionPayload | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginNextPath, setLoginNextPath] = useState("/dashboard");
  const routingQueue = useRef<string | null>(null);

  /** Tracks latest desired redirect triggered by Secure Login flows */
  const assignRedirect = useCallback((candidate?: string) => {
    const safe = candidate && candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : "/dashboard";
    routingQueue.current = safe;
    setLoginNextPath(safe);
  }, []);

  /** Hydrate demo session locally */
  useEffect(() => {
    setDemoSessionState(readDemoSession());
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (!supabaseConfigured) {
      setSession(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
      if (nextSession?.user) {
        clearDemoActionCount();
        clearDemoSession();
        setDemoSessionState(null);
        setLoginModalOpen(false);
      }
    });

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      })
      .finally(() => setIsLoading(false));

    return () => subscription.unsubscribe();
  }, [supabase, supabaseConfigured]);

  const openLoginModal = useCallback(
    (nextPath: string = "/dashboard") => {
      assignRedirect(nextPath);
      setLoginModalOpen(true);
    },
    [assignRedirect]
  );

  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false);
    routingQueue.current = null;
  }, []);

  const enableDemoLogin = useCallback(() => {
    writeDemoSession({ email: "demo-founder@trustidea.app", name: "Demo Founder" });
    clearDemoActionCount();
    setDemoSessionState(readDemoSession());
    setLoginModalOpen(false);
  }, []);

  /** Route once authentication succeeds via SPA pathways */
  useEffect(() => {
    if (!(session?.user ?? demoSession)) return;

    const target = routingQueue.current;
    if (!target) return;

    routingQueue.current = null;
    router.replace(target);
    setLoginModalOpen(false);
  }, [demoSession, router, session?.user]);

  useEffect(() => {
    if (!user) return;

    void upsertProfileForUser(user);
    void (async () => {
      const prefs = await loadUserPreferences(user.id);
      if (!prefs || typeof window === "undefined") return;

      if (prefs.language) {
        window.localStorage.setItem("trust-idea-multilingual-kit-lang", prefs.language);
      }
      if (prefs.theme === "light" || prefs.theme === "dark") {
        window.localStorage.setItem("theme", prefs.theme);
        document.documentElement.classList.toggle("dark", prefs.theme === "dark");
      }
    })();
  }, [user]);

  const signOut = useCallback(async () => {
    routingQueue.current = null;
    clearDemoSession();
    setDemoSessionState(null);
    if (supabaseConfigured) {
      await supabase.auth.signOut();
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/auth/signout";
      document.body.appendChild(form);
      form.submit();
    }
  }, [supabase, supabaseConfigured]);

  const authenticated = Boolean(user ?? demoSession);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      demoSession,
      isAuthenticated: authenticated,
      isLoading,
      signOut,
      enableDemoLogin,
      openLoginModal,
      closeLoginModal,
      loginModalOpen,
      loginNextPath,
    }),
    [
      authenticated,
      user,
      session,
      demoSession,
      isLoading,
      signOut,
      enableDemoLogin,
      openLoginModal,
      closeLoginModal,
      loginModalOpen,
      loginNextPath,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
