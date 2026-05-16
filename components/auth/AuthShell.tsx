"use client";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { LoginModal } from "@/components/auth/LoginModal";
import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <LoginModal />
    </AuthProvider>
  );
}
