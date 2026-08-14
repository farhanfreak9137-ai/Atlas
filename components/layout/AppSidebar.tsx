"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation, navGroups } from "@/lib/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden lg:flex w-64 p-5">

      {/* Glass Container */}
      <div
        className="
          flex
          h-full
          w-full
          flex-col

          rounded-[28px]

          border
          border-[var(--sidebar-border)]

          bg-[var(--card)]

          backdrop-blur-xl

          shadow-[var(--shadow-card),inset_0_1px_0_0_rgba(255,255,255,0.07)]

          overflow-hidden
        "
      >

        {/* Subtle top glow */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-40

            bg-gradient-to-b
            from-[var(--primary)]/12
            via-transparent
            to-transparent

            pointer-events-none
          "
        />

        {/* Logo */}
        <div className="relative px-6 pt-7 pb-5">
          <div className="flex items-center gap-3">

            {/* Icon */}
            <div className="relative h-9 w-9 flex-shrink-0">
              <Image
                src="/atlas-icon.png"
                alt="Atlas icon"
                width={36}
                height={36}
                className="object-contain drop-shadow-[0_0_10px_var(--primary-glow)]"
                priority
              />
            </div>

            {/* Wordmark */}
            <div>
              <h1 className="text-xl font-semibold font-heading tracking-tight text-[var(--text)]">
                Atlas
              </h1>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--primary)]">
                Personal AI OS
              </p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-[var(--border)]" />

        {/* Navigation — grouped sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">

          {navGroups.map((group) => {
            const items = navigation.filter((item) => item.group === group.key);
            if (items.length === 0) return null;

            return (
              <div key={group.key}>

                {/* Section label */}
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary,#64748b)]">
                  {group.label}
                </p>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`
                          group
                          relative

                          flex
                          items-center
                          gap-3

                          rounded-xl

                          px-3
                          py-2.5

                          ${
                            active
                              ? `
                                bg-[var(--primary)]/10
                                text-[var(--text)]
                                font-semibold
                              `
                              : `
                                text-[var(--text-secondary)]
                                hover:bg-white/5
                                hover:text-[var(--text)]
                              `
                          }
                        `}
                        style={{
                          transition:
                            "background-color 150ms ease, color 150ms ease",
                        }}
                      >
                        {/* Left-edge active indicator bar — Linear-style */}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]" />
                        )}

                        <Icon
                          size={18}
                          className={`
                            flex-shrink-0
                            transition-transform
                            duration-200
                            group-hover:scale-105
                            ${active
                              ? "text-[var(--primary)]"
                              : "text-[var(--text-tertiary,#64748b)] group-hover:text-[var(--text)]"
                            }
                          `}
                        />

                        <span className="text-sm">
                          {item.title}
                        </span>

                      </Link>
                    );
                  })}
                </div>

              </div>
            );
          })}

        </nav>

        {/* Bottom — Productivity widget */}
        <div className="p-4">

          <div
            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface-2,rgba(255,255,255,0.04))]
              p-4
            "
          >

            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary,#64748b)]">
                Productivity
              </p>
              <span className="text-lg font-bold font-heading tabular-nums text-[var(--text)]">
                82%
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="
                  h-full
                  w-[82%]
                  rounded-full
                  bg-gradient-to-r
                  from-[var(--primary)]
                  to-emerald-400
                  shadow-[0_0_8px_rgba(16,185,129,0.4)]
                "
              />
            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}