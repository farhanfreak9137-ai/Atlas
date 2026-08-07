"use client";

import { Bell, Command, Search, Menu } from "lucide-react";
import { useSearchStore } from "@/stores/search.store";
import { useNavigationStore } from "@/stores/navigation.store";
import { useProfileStore } from "@/stores/profile.store";

export function AppNavbar() {
  const { openPanel } = useSearchStore();
  const { toggleMobileMenu } = useNavigationStore();
  const { profile, openProfile } = useProfileStore();

  return (
    <header className="px-3 sm:px-6 lg:px-10 pt-4 sm:pt-6 lg:pt-8">
      {/* Primary Top Header Card */}
      <div
        className="
          flex
          h-16 sm:h-20
          items-center
          justify-between
          gap-3
          rounded-[20px] sm:rounded-[28px]
          border
          border-white/10
          bg-white/[0.05]
          px-3 sm:px-6 md:px-8
          backdrop-blur-3xl
          shadow-[0_10px_50px_rgba(0,0,0,.35)]
        "
      >
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="
              flex lg:hidden
              items-center justify-center
              h-10 w-10 sm:h-11 sm:w-11
              rounded-xl sm:rounded-2xl
              border border-white/10
              bg-white/5 hover:bg-white/10
              text-zinc-300 hover:text-white
              transition-all
            "
            aria-label="Open sidebar menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="hidden text-sm text-zinc-500 sm:block">
              Welcome Back
            </p>
            <h1 className="text-lg font-bold tracking-tight sm:mt-1 sm:text-2xl">
              Atlas
            </h1>
          </div>
        </div>

        {/* Center Search Input Button - Visible on md+ */}
        <button
          onClick={openPanel}
          className="
            hidden md:flex
            flex-1
            max-w-[420px]
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-black/20
            px-5
            py-3
            text-zinc-400
            transition-all
            hover:border-[#1F7A5B]/30
            hover:bg-white/5
          "
        >
          <Search size={18} />
          <span className="flex-1 text-left text-sm">
            Search Atlas...
          </span>
          <div
            className="
              flex
              items-center
              gap-1
              rounded-lg
              bg-white/5
              px-2
              py-1
              text-xs
            "
          >
            <Command size={12} />
            K
          </div>
        </button>

        {/* Right Action Icons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Mobile search icon trigger */}
          <button
            onClick={openPanel}
            className="
              flex md:hidden
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-2.5
              text-zinc-300 hover:text-white
              transition-all
              hover:bg-white/10
            "
            aria-label="Search Atlas"
          >
            <Search size={18} />
          </button>

          <button
            className="
              rounded-xl sm:rounded-2xl
              border
              border-white/10
              bg-white/5
              p-2.5 sm:p-3
              text-zinc-300 hover:text-white
              transition-all
              hover:bg-white/10
            "
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Avatar Profile Button */}
          <button
            onClick={openProfile}
            aria-label="Open profile"
            className="
              flex
              items-center
              gap-2 sm:gap-3
              rounded-xl sm:rounded-2xl
              border
              border-white/10
              bg-white/5
              p-1.5 sm:px-4 sm:py-2
              hover:bg-white/10 hover:border-[#1F7A5B]/30
              transition-all duration-200
              group
            "
          >
            <div
              className="
                flex
                h-8 w-8 sm:h-11 sm:w-11
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#1F7A5B]
                to-[#2A8F66]
                text-sm font-bold
                text-white
                group-hover:shadow-[0_0_20px_rgba(31,122,91,.5)]
                transition-all duration-200
              "
            >
              {profile.initials || "U"}
            </div>

            <div className="hidden sm:block">
              <p className="font-medium text-sm">
                {profile.name || "Profile"}
              </p>
              <p className="text-xs text-zinc-500">
                Personal OS
              </p>
            </div>
          </button>
        </div>
      </div>


    </header>
  );
}