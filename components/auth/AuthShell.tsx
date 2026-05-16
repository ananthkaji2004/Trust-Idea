"use client";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { LoginModal } from "@/components/auth/LoginModal";
import { BrandProjectProvider } from "@/components/providers/BrandProjectProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrandProjectProvider>
          {children}
          <LoginModal />
        </BrandProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
