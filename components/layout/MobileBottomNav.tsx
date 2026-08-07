"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { useNavigationStore } from "@/stores/navigation.store";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleMobileMenu } = useNavigationStore();

  // Ref for currently active navigation item anchor
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  // Ref for the scrollable container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active item into the middle of the scroll container
  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeEl = activeItemRef.current!;

      const containerWidth = container.offsetWidth;
      const activeElLeft = activeEl.offsetLeft;
      const activeElWidth = activeEl.offsetWidth;

      const scrollPosition = activeElLeft - containerWidth / 2 + activeElWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Backdrop blur container */}
      <div className="absolute inset-0 border-t border-white/10 bg-[#050816]/90 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" />

      {/* Left/Right Gradient Fade Mask to hint horizontal scrollability */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#050816] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#050816] to-transparent z-10" />

      {/* Horizontal Touch Scroll Nav */}
      <div
        ref={containerRef}
        className="relative flex items-center gap-1.5 overflow-x-auto px-4 py-2 pb-safe no-scrollbar scroll-smooth"
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              ref={active ? activeItemRef : null}
              className={`
                flex shrink-0 items-center gap-2
                rounded-2xl
                px-3.5 py-2
                transition-all duration-200
                ${
                  active
                    ? "bg-[#1F7A5B]/25 text-white border border-[#1F7A5B]/40 shadow-lg shadow-[0_4px_15px_rgba(31,122,91,.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <div className="relative flex items-center justify-center">
                <Icon size={19} className={active ? "text-[#1F7A5B]" : "text-zinc-400"} />
                {active && (
                  <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#1F7A5B] shadow-[0_0_8px_#1F7A5B]" />
                )}
              </div>
              <span className={`text-xs whitespace-nowrap ${active ? "font-semibold text-white" : "font-medium"}`}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="
          flex items-center gap-2
          rounded-2xl
          border border-white/10
          bg-white/5 hover:bg-white/10
          px-3.5 py-2
          text-zinc-300 hover:text-white
          transition-all duration-200
        "
        aria-label="Open menu drawer"
      >
        <Menu size={19} className="text-[#1F7A5B]" />
        <span className="text-xs font-semibold whitespace-nowrap">Menu</span>
      </button>
    </nav>
  );
}