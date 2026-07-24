import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";
import { SearchPanel } from "@/components/common/SearchPanel";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background */}

      <div className="absolute inset-0 -z-50">

        {/* Blue Glow */}

        <div
          className="
            absolute
            left-[-250px]
            top-[-200px]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#1F7A5B]/20
            blur-[180px]
        "
        />

        {/* Purple Glow */}

        <div
          className="
            absolute
            right-[-300px]
            top-[25%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-violet-500/15
            blur-[220px]
        "
        />

        {/* Cyan Glow */}

        <div
          className="
            absolute
            bottom-[-300px]
            left-1/3
            h-[700px]
            w-[700px]
            rounded-full
            bg-cyan-500/10
            blur-[220px]
        "
        />

        {/* Subtle Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
            bg-[size:60px_60px]
        "
        />

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.55))]
        "
        />

      </div>

      {/* App */}

      <div className="relative z-10 flex min-h-screen">

        <AppSidebar />

        <div className="flex flex-1 flex-col">

          <AppNavbar />

          <main className="flex-1 overflow-y-auto p-10">
            {children}
          </main>

        </div>

      </div>

      {/* Global: Search panel mounted here */}
      <SearchPanel />

    </div>
  );
}