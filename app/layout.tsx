import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { AuthShell } from "@/components/auth/AuthShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TRUST IDEA — Turn One Idea Into a Trusted Brand Reality",
  description:
    "Turn raw business ideas into launch-ready brand kits with Fal-powered visuals, 3D brand previews, multilingual content, and AI Trust Scores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=!t||t==='dark';document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100`}
      >
        <div className="ambient-glow fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
        <AuthShell>{children}</AuthShell>
      </body>
    </html>
  );
}
