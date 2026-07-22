"use client";

import { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatEmpty } from "./ChatEmpty";

interface ChatContainerProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

export function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col gap-6 flex-1 overflow-y-auto pb-6">
      {messages.length === 0 ? (
        <ChatEmpty />
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-[#1F7A5B]/30 flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-[#1F7A5B] rounded-full animate-pulse" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="glass rounded-2xl rounded-bl-none border border-white/10 px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
