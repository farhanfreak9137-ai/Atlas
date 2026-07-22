"use client";

import { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  const adjustHeight = (): void => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    await onSend(message);
    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        handleSubmit(e as any);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 items-end"
    >
      <div className="flex-1 glass rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-xl">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Atlas..."
          rows={1}
          disabled={isLoading}
          className="
            w-full
            resize-none
            bg-transparent
            text-white
            placeholder:text-zinc-500
            outline-none
            text-sm
            leading-relaxed
            max-h-[120px]
            disabled:opacity-50
          "
        />
      </div>

      <GlassButton
        type="submit"
        disabled={!message.trim() || isLoading}
        className="rounded-2xl p-3 min-w-fit"
      >
        <Send size={20} />
      </GlassButton>
    </form>
  );
}
