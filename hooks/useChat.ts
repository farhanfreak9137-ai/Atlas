"use client";

import { useChatStore } from "@/stores/chat.store";
import { ChatService } from "@/services/chat.service";

export function useChat() {
  const { messages, isLoading, addMessage, clearMessages, setLoading } =
    useChatStore();

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;
    await ChatService.sendMessage(content);
  };

  const clear = (): void => {
    ChatService.clear();
    clearMessages();
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clear,
  };
}
