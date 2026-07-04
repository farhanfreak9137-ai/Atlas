// TODO: Add collapsible mobile sidebar
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppNavbar />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}