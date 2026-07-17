"use client";

import {
  Bell,
  Command,
  Search,
} from "lucide-react";

export function AppNavbar() {
  return (
    <header className="px-10 pt-8">

      <div
        className="
          flex
          h-20
          items-center
          justify-between

          rounded-[28px]

          border
          border-white/10

          bg-white/[0.05]

          px-8

          backdrop-blur-3xl

          shadow-[0_10px_50px_rgba(0,0,0,.35)]
        "
      >

        {/* Left */}

        <div>

          <p className="text-sm text-zinc-500">
            Welcome Back
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Atlas
          </h1>

        </div>

        {/* Center */}

        <button
          className="
            flex
            w-[420px]
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

            hover:border-[#1F7A5B]/20
            hover:bg-white/5
          "
        >

          <Search size={18} />

          <span className="flex-1 text-left">
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

        {/* Right */}

        <div className="flex items-center gap-4">

          <button
            className="
              rounded-2xl

              border
              border-white/10

              bg-white/5

              p-3

              transition-all

              hover:bg-white/10
            "
          >
            <Bell size={18} />
          </button>

          <div
            className="
              flex
              items-center
              gap-4

              rounded-2xl

              border
              border-white/10

              bg-white/5

              px-4
              py-2
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full

                bg-gradient-to-br
                from-[#1F7A5B]
                to-[#2A8F66]

                font-bold
              "
            >
              F
            </div>

            <div>

              <p className="font-medium">
                Farhan
              </p>

              <p className="text-xs text-zinc-500">
                Personal OS
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}