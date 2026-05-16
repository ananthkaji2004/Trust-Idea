"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastTone = "success" | "info" | "danger";

export type ToastMessage = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ToastCtx = {
  showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Date.now();
    const entry = { id, tone, message };
    setToasts((prev) => [...prev.slice(-5), entry]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-2 max-w-[min(100vw-2rem,360px)]">
        {toasts.map((toast) => (
          <output
            key={toast.id}
            className={`glass-card px-4 py-3 text-sm shadow-2xl border ${
              toast.tone === "success"
                ? "border-emerald-500/30 text-emerald-100"
                : toast.tone === "danger"
                  ? "border-red-500/30 text-red-100"
                  : "border-blue-400/25 text-blue-50"
            }`}
            aria-live="polite"
          >
            {toast.message}
          </output>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must run inside ToastProvider");
  }
  return ctx;
}
