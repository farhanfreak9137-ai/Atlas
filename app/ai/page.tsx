"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { PageContainer } from "@/components/ui/PageContainer";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function AIPage() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Atlas"
        title="AI Chat"
        description="Get instant assistance with your questions and tasks."
      />

      <div className="flex flex-col h-[calc(100vh-280px)] gap-6 rounded-3xl border border-white/10 glass p-6">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
        />

        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  );
}
