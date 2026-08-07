"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { useNavigationStore } from "@/stores/navigation.store";

export function MobileNavDrawer() {
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useNavigationStore();

  // Close drawer on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Prevent background body scrolling when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <aside
        className="
          fixed inset-y-0 left-0 z-50
          w-[85vw] max-w-[340px]
          flex flex-col
          border-r border-white/10
          bg-[#050816]/95 backdrop-blur-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.8)]
          animate-in slide-in-from-left duration-300
        "
      >
        {/* Glow accent */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1F7A5B]/20 to-transparent pointer-events-none" />

        {/* Header with Logo and Close Button */}
        <div className="relative flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-[#1F7A5B] to-[#2A8F66]
                text-lg font-bold text-white
                shadow-lg shadow-[0_10px_30px_rgba(31,122,91,.3)]
              "
            >
              A
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Atlas</h2>
              <p className="text-xs text-zinc-400">Personal OS</p>
            </div>
          </div>

          <button
            onClick={closeMobileMenu}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl border border-white/10 bg-white/5
              text-zinc-400 hover:text-white hover:bg-white/10
              transition-colors
            "
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-white/10" />

        {/* Section Title */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            All Modules ({navigation.length})
          </span>
          <Sparkles size={14} className="text-[#1F7A5B]" />
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto space-y-1.5 px-4 py-2 no-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className={`
                  group flex items-center gap-3.5
                  rounded-2xl px-4 py-3.5
                  transition-all duration-200
                  ${
                    active
                      ? "bg-[#1F7A5B]/20 text-white border border-[#1F7A5B]/30 shadow-lg shadow-[0_10px_30px_rgba(31,122,91,.15)] font-semibold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105
                    ${active ? "bg-[#1F7A5B] text-white" : "bg-white/5 text-zinc-400 group-hover:text-white"}
                  `}
                >
                  <Icon size={18} />
                </div>
                <span className="flex-1 text-sm font-medium">{item.title}</span>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-[#1F7A5B] shadow-[0_0_10px_#1F7A5B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Productivity Widget */}
        <div className="p-6 pt-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-zinc-400">Productivity</p>
            <div className="mt-1 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-white">82%</h3>
              <span className="text-xs text-[#1F7A5B] font-medium">On Track</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1F7A5B] to-[#2A8F66]"
                style={{ width: "82%" }}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
