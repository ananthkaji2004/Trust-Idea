import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-black text-zinc-100 antialiased`}>
        <div className="ambient-glow fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
