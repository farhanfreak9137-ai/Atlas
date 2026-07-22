"use client";

import { Brain } from "lucide-react";

export function ChatEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="rounded-full bg-[#1F7A5B]/15 p-4 border border-[#1F7A5B]/20">
        <Brain size={32} className="text-[#1F7A5B]" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white">
          Welcome to Atlas AI Chat
        </h2>

        <p className="mt-2 text-sm text-zinc-400 max-w-xs">
          Start a conversation to get AI-powered assistance with your tasks,
          questions, and ideas.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-left">
        {[
          "Ask questions",
          "Get advice",
          "Brainstorm ideas",
        ].map((item) => (
          <div
            key={item}
            className="rounded-lg glass border border-white/10 px-3 py-2"
          >
            <p className="text-xs text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
