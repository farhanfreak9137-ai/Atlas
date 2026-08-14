"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          border-r border-[var(--border)]
          bg-[var(--card)] backdrop-blur-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.5)]
          animate-in slide-in-from-left duration-300
        "
      >
        {/* Glow accent */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--primary)]/15 to-transparent pointer-events-none" />

        {/* Header with Logo and Close Button */}
        <div className="relative flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 flex-shrink-0">
              <Image
                src="/atlas-icon.png"
                alt="Atlas icon"
                width={44}
                height={44}
                className="object-contain drop-shadow-[0_0_12px_var(--primary-glow)]"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold font-heading tracking-tight text-[var(--text)]">Atlas</h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">Personal OS</p>
            </div>
          </div>

          <button
            onClick={closeMobileMenu}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]
              text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]
              transition-colors
            "
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-[var(--border)]" />

        {/* Section Title */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            All Modules ({navigation.length})
          </span>
          <Sparkles size={14} className="text-[var(--primary)]" />
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
                      ? "bg-[var(--primary)]/20 text-[var(--text)] border border-[var(--primary)]/30 shadow-lg shadow-[0_10px_30px_rgba(16,185,129,.15)] font-bold"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  }
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105
                    ${active ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-2)] text-[var(--text-secondary)] group-hover:text-[var(--text)]"}
                  `}
                >
                  <Icon size={18} />
                </div>
                <span className="flex-1 text-sm font-medium">{item.title}</span>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary-glow)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Productivity Widget */}
        <div className="p-6 pt-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Productivity</p>
            <div className="mt-1 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold font-heading text-[var(--text)]">82%</h3>
              <span className="text-xs text-[var(--primary)] font-semibold">On Track</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                style={{ width: "82%" }}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
