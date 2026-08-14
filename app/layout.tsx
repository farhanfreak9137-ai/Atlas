import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import "./theme.css";

import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-sans-google",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-heading-google",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono-google",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Atlas",
  description: "Personal AI Operating System",
  icons: {
    icon: "/icon.png",
    apple: "/atlas-icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${monoFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full font-sans bg-[var(--background)] text-[var(--text)] transition-colors duration-300 selection:bg-[var(--primary)]/30 selection:text-[var(--primary)]">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}