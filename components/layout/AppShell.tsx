"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SearchPanel } from "@/components/common/SearchPanel";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import { ProfilePanel } from "./ProfilePanel";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { useAuthStore } from "@/stores/auth.store";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user, loading, isSupabaseConfigured, initAuthListener } = useAuthStore();
  const [guestMode, setGuestMode] = useState(false);

  // Initialize Auth Listener immediately when AppShell mounts
  useEffect(() => {
    const unsub = initAuthListener();

    // Safety fallback: Ensure loading screen never hangs longer than 1.5s
    const timer = setTimeout(() => {
      useAuthStore.setState({ loading: false });
    }, 1500);

    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, [initAuthListener]);

  // If loading session, show dark splash spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--text)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-white text-xl font-bold animate-pulse shadow-lg shadow-[var(--primary-glow)]">
          A
        </div>
        <p className="mt-4 text-xs text-slate-400 font-mono tracking-wider">LOADING ATLAS OS...</p>
      </div>
    );
  }

  // If not authenticated and Supabase keys are configured, show dedicated Auth Screen first
  if (!user && !guestMode && isSupabaseConfigured) {
    return <AuthScreen onGuestAccess={() => setGuestMode(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)] transition-colors duration-300">
      {/* Settings effects — applies theme, font-size, accent color, etc. */}
      <SettingsProvider />

      {/* Background Glows */}
      <div className="absolute inset-0 -z-50 pointer-events-none opacity-40 dark:opacity-100 transition-opacity duration-300">
        <div className="absolute left-[-200px] top-[-150px] h-[750px] w-[750px] rounded-full bg-[var(--primary)]/15 blur-[180px] transition-colors duration-500" />
        <div className="absolute right-[-250px] top-[20%] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[220px]" />
        <div className="absolute bottom-[-250px] left-1/3 h-[750px] w-[750px] rounded-full bg-violet-500/10 blur-[220px]" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex min-h-screen min-w-0 w-full">
        <AppSidebar />

        <div className="flex flex-1 flex-col min-w-0 w-full">
          <AppNavbar />

          <main className="flex-1 min-w-0 w-full overflow-y-auto p-3.5 pb-28 sm:p-6 sm:pb-28 lg:p-10 lg:pb-10">
            <div className="page-enter">
              {children}
            </div>
          </main>

        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />

      {/* Mobile slide-over navigation drawer */}
      <MobileNavDrawer />

      {/* Global Search panel */}
      <SearchPanel />

      {/* Global Profile panel */}
      <ProfilePanel />
    </div>
  );
}