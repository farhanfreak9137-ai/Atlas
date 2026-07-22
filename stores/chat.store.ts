import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatMessage, ChatState } from "@/types/chat";

interface ChatStore extends ChatState {
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,

      addMessage: (message: ChatMessage) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      clearMessages: () =>
        set({
          messages: [],
        }),

      setLoading: (isLoading: boolean) =>
        set({
          isLoading,
        }),
    }),
    {
      name: "atlas_chat_store",
    }
  )
);
