"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatEmpty } from "./ChatEmpty";
import { Sparkles } from "lucide-react";

interface ChatContainerProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onSelectPrompt?: (prompt: string) => void;
}

// Rotating context-aware thinking labels
const THINKING_LABELS = [
  "Atlas AI is thinking",
  "Checking your tasks",
  "Analyzing your habits",
  "Generating insights",
  "Reviewing your goals",
];

function ThinkingIndicator() {
  const [labelIdx, setLabelIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLabelIdx((i) => (i + 1) % THINKING_LABELS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">

      {/* AI Avatar — pulse ring while thinking */}
      <div
        className="
          h-8 w-8
          rounded-full
          flex-shrink-0
          flex items-center justify-center
          mt-1
          bg-gradient-to-br from-emerald-500/30 to-teal-600/20
          border border-emerald-500/40
          text-emerald-400
          avatar-thinking
        "
      >
        <Sparkles size={14} className="animate-pulse" />
      </div>

      <div className="flex flex-col gap-1">
        <div
          className="
            glass
            rounded-2xl rounded-tl-none
            border border-[var(--border)]
            px-4 py-3
            shadow-md
            flex items-center gap-3
          "
        >
          {/* Cycling label */}
          <span
            key={labelIdx}
            className="text-xs font-semibold text-[var(--primary)] animate-in fade-in duration-300"
          >
            {THINKING_LABELS[labelIdx]}
          </span>

          {/* Waveform bars — replacing generic bouncing dots */}
          <div className="flex items-end gap-[3px] h-4">
            <div className="thinking-bar w-[3px] h-4 rounded-full bg-[var(--primary)]/70" />
            <div className="thinking-bar w-[3px] h-4 rounded-full bg-[var(--primary)]/70" />
            <div className="thinking-bar w-[3px] h-4 rounded-full bg-[var(--primary)]/70" />
            <div className="thinking-bar w-[3px] h-4 rounded-full bg-[var(--primary)]/70" />
            <div className="thinking-bar w-[3px] h-4 rounded-full bg-[var(--primary)]/70" />
          </div>
        </div>
      </div>

    </div>
  );
}

export function ChatContainer({ messages, isLoading, onSelectPrompt }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    const container = containerRef.current as HTMLDivElement | null;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} className="flex flex-col gap-5 flex-1 overflow-y-auto pb-6 pr-1 custom-scrollbar">
      {messages.length === 0 ? (
        <ChatEmpty onSelectPrompt={onSelectPrompt} />
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {isLoading && <ThinkingIndicator />}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
