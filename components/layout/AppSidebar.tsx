"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden lg:flex w-80 p-6">

      {/* Glass Container */}

      <div
        className="
          flex
          h-full
          w-full
          flex-col

          rounded-[32px]

          border
          border-white/10

          bg-white/[0.05]

          backdrop-blur-3xl

          shadow-[0_20px_80px_rgba(0,0,0,.45)]

          overflow-hidden
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-40

            bg-gradient-to-b
            from-blue-500/15
            to-transparent

            pointer-events-none
          "
        />

        {/* Logo */}

        <div className="relative p-8">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-blue-500
                to-cyan-400

                text-xl
                font-bold

                shadow-lg
                shadow-blue-500/30
              "
            >
              A
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight">
                Atlas
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                Personal OS
              </p>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="mx-6 h-px bg-white/10" />

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-6">

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`
                  group

                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  px-5
                  py-4

                  transition-all
                  duration-300

                  ${
                    active
                      ? `
                        bg-blue-500/15
                        text-white

                        border
                        border-blue-400/20

                        shadow-lg
                        shadow-blue-500/10
                      `
                      : `
                        text-zinc-400

                        hover:bg-white/5
                        hover:text-white
                      `
                  }
                `}
              >

                <Icon
                  size={22}
                  className="
                    transition-transform
                    duration-300

                    group-hover:scale-110
                  "
                />

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>
            );
          })}

        </nav>

        {/* Bottom */}

        <div className="p-6">

          <div
            className="
              rounded-3xl

              border
              border-white/10

              bg-white/5

              p-5
            "
          >

            <p className="text-sm text-zinc-400">
              Productivity
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              82%
            </h2>

            <div className="mt-4 h-2 rounded-full bg-white/10">

              <div
                className="
                  h-full
                  w-[82%]

                  rounded-full

                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                "
              />

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}