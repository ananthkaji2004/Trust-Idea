"use client";

const DEMO_STORAGE_KEY = "trust-idea-demo-session";

export type DemoSessionPayload = {
  email: string;
  name?: string;
};

export function readDemoSession(): DemoSessionPayload | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DemoSessionPayload;
    if (!parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDemoSession(payload: DemoSessionPayload) {
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
}

export function clearDemoSession() {
  window.localStorage.removeItem(DEMO_STORAGE_KEY);
}

export { DEMO_STORAGE_KEY };
