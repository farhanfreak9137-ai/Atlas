"use client";

import { Bell, Command, Search, Menu } from "lucide-react";
import Image from "next/image";
import { useSearchStore } from "@/stores/search.store";
import { useNavigationStore } from "@/stores/navigation.store";
import { useProfileStore } from "@/stores/profile.store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/navigation";

import { NotificationCenter } from "./NotificationCenter";

// Cycling search placeholder strings
const SEARCH_PLACEHOLDERS = [
  "Search tasks...",
  "Find a habit...",
  "Ask Atlas AI...",
  "Open journal...",
  "Search goals...",
];

export function AppNavbar() {
  const { openPanel } = useSearchStore();
  const { toggleMobileMenu } = useNavigationStore();
  const { profile, openProfile } = useProfileStore();
  const pathname = usePathname();

  // Cycling search placeholder
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Dynamic breadcrumb from current route
  const currentPage = navigation.find((item) => item.href === pathname);
  const pageLabel = currentPage?.title ?? "Dashboard";
  const PageIcon = currentPage?.icon;

  return (
    <header className="px-3 sm:px-5 lg:px-8 pt-4 sm:pt-5 lg:pt-7">
      {/* Primary Top Header Card — Pill Navbar */}
      <div
        className="
          glass-card-glow

          flex
          h-14 sm:h-16
          items-center
          justify-between
          gap-3

          rounded-2xl sm:rounded-[22px] lg:rounded-full

          border
          border-[var(--border)]

          bg-[var(--card)]

          px-3 sm:px-5 md:px-6

          backdrop-blur-xl

          shadow-[var(--shadow-card),inset_0_1px_0_0_rgba(255,255,255,0.08)]
        "
      >
        {/* Left Section */}
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="
              flex lg:hidden
              items-center justify-center
              h-9 w-9
              rounded-xl
              border border-[var(--border)]
              bg-white/5 hover:bg-white/10
              text-[var(--text-secondary)] hover:text-[var(--text)]
            "
            style={{ transition: "background-color 150ms ease, color 150ms ease" }}
            aria-label="Open sidebar menu"
          >
            <Menu size={18} />
          </button>

          {/* Atlas icon — mobile only, hidden on lg+ where sidebar has logo */}
          <div className="relative h-7 w-7 flex-shrink-0 lg:hidden">
            <Image
              src="/atlas-icon.png"
              alt="Atlas"
              width={28}
              height={28}
              className="object-contain drop-shadow-[0_0_8px_var(--primary-glow)]"
              priority
            />
          </div>

          {/* Dynamic breadcrumb — desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            {PageIcon && (
              <PageIcon size={16} className="text-[var(--primary)] flex-shrink-0" />
            )}
            <span className="text-base font-semibold font-heading tracking-tight text-[var(--text)]">
              {pageLabel}
            </span>
          </div>

          {/* Mobile: just show "Atlas" label */}
          <span className="lg:hidden text-base font-semibold font-heading text-[var(--text)]">
            Atlas
          </span>

        </div>

        {/* Center Search Input Button - Visible on md+ */}
        <button
          onClick={openPanel}
          className="
            hidden md:flex
            flex-1
            max-w-[380px]
            items-center
            gap-3
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--glass)]
            px-4
            py-2.5
            text-[var(--text-secondary)]
          "
          style={{
            transition: "border-color 150ms ease, background-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(16, 185, 129, 0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "";
          }}
        >
          <Search size={16} className="text-[var(--text-tertiary,#64748b)] flex-shrink-0" />
          <span
            key={placeholderIdx}
            className="flex-1 text-left text-sm font-medium text-[var(--text-secondary)] animate-in fade-in duration-300"
          >
            {SEARCH_PLACEHOLDERS[placeholderIdx]}
          </span>
          <div
            className="
              flex
              items-center
              gap-1
              rounded-md
              bg-white/8
              px-1.5
              py-0.5
              text-[11px]
              font-mono
              text-[var(--text-tertiary,#64748b)]
            "
          >
            <Command size={11} />
            K
          </div>
        </button>

        {/* Right Action Icons */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

          {/* Mobile search icon trigger */}
          <button
            onClick={openPanel}
            className="
              flex md:hidden
              items-center justify-center
              h-9 w-9
              rounded-xl
              border border-[var(--border)]
              bg-white/5 hover:bg-white/10
              text-[var(--text-secondary)] hover:text-[var(--text)]
            "
            style={{ transition: "background-color 150ms ease, color 150ms ease" }}
            aria-label="Search Atlas"
          >
            <Search size={17} />
          </button>

          {/* Interactive Notification Center Dropdown */}
          <NotificationCenter />

          {/* Avatar Profile Button */}
          <button
            onClick={openProfile}
            aria-label="Open profile"
            className="
              flex
              items-center
              gap-2 sm:gap-2.5
              rounded-xl
              border border-[var(--border)]
              bg-white/5
              p-1.5 sm:px-3 sm:py-1.5
              hover:bg-white/10
              group
            "
            style={{
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(16, 185, 129, 0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "";
            }}
          >
            <div className="relative">
              <div
                className="
                  flex
                  h-7 w-7 sm:h-8 sm:w-8
                  items-center
                  justify-center
                  rounded-full
                  overflow-hidden
                  bg-[var(--primary)]
                  text-xs font-semibold
                  text-white
                  border border-white/20
                "
                style={{
                  boxShadow: "0 0 12px rgba(16, 185, 129, 0.3)",
                  transition: "box-shadow 200ms ease",
                }}
              >
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{profile.initials || "U"}</span>
                )}
              </div>
              {/* Online status dot */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--color-success,#22c55e)] border border-[var(--background)] " />
            </div>

            <div className="hidden sm:block text-left">
              <p className="font-semibold text-xs text-[var(--text)] leading-tight">
                {profile.name || "Profile"}
              </p>
              <p className="text-[10px] text-[var(--text-tertiary,#64748b)] font-medium">
                Personal OS
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}