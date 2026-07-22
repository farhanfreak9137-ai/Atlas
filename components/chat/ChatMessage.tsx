"use client";

import { ChatMessage as ChatMessageType } from "@/types/chat";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <Avatar className="mt-1">
        <AvatarImage
          src={
            isUser
              ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              : "https://api.dicebear.com/7.x/bottts/svg?seed=atlas"
          }
          alt={isUser ? "You" : "Atlas"}
        />
        <AvatarFallback className="bg-[#1F7A5B]">
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div
        className={`max-w-md flex flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`
            rounded-2xl
            px-4
            py-3
            text-sm
            leading-relaxed
            animate-in
            fade-in
            ${
              isUser
                ? "rounded-br-none bg-[#1F7A5B] text-white"
                : `
                  rounded-bl-none
                  glass
                  border
                  border-white/10
                  text-white
                `
            }
          `}
        >
          {message.content}
        </div>

        <span className="text-xs text-zinc-500 px-2">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
