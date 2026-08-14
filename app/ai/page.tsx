"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PageContainer } from "@/components/ui/PageContainer";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useDashboardStore } from "@/stores/dashboard.store";
import { Trash2, Copy, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

export default function AIPage() {
  const { messages, isLoading, sendMessage, clear } = useChat();
  const { settings, updateSettings } = useDashboardStore();

  const [copiedAll, setCopiedAll] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleCopyChat = () => {
    if (messages.length === 0) return;
    const formattedLog = messages
      .map((m) => `[${m.role === "user" ? "You" : "Atlas AI"}]: ${m.content}`)
      .join("\n\n");
    navigator.clipboard.writeText(formattedLog);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Atlas"
        title="AI Chat"
        description="Get instant assistance with your tasks, goals, habits, and ideas."
      >
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <GlassButton
                onClick={handleCopyChat}
                className="px-3 py-2 text-xs flex items-center gap-1.5"
                title="Copy entire conversation"
              >
                {copiedAll ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied Log</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Log</span>
                  </>
                )}
              </GlassButton>

              <GlassButton
                onClick={clear}
                className="px-3 py-2 text-xs flex items-center gap-1.5 text-rose-300 hover:text-rose-200 hover:border-rose-500/30"
                title="Clear conversation history"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </GlassButton>
            </>
          )}

          <GlassButton
            onClick={() => setShowSettings(!showSettings)}
            className={`px-3 py-2 text-xs flex items-center gap-1.5 ${
              showSettings ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : ""
            }`}
            title="AI Chat Settings"
          >
            <SlidersHorizontal size={14} />
            <span>AI Config</span>
          </GlassButton>
        </div>
      </PageHeader>

      {/* AI Controls Drawer */}
      {showSettings && (
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                updateSettings({ creativeMode: !settings.creativeMode })
              }
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all
                ${
                  settings.creativeMode
                    ? "bg-[var(--primary)]/20 border-[var(--primary)]/40 text-[var(--primary)] font-medium"
                    : "bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                }
              `}
            >
              <Sparkles size={14} className={settings.creativeMode ? "text-[var(--primary)] animate-spin" : "text-[var(--text-tertiary)]"} style={{ animationDuration: "6s" }} />
              <span>Creative Mode: {settings.creativeMode ? "ON" : "OFF"}</span>
            </button>

            <div className="flex items-center gap-2 border-l border-[var(--border)] pl-3">
              <span className="text-[var(--text-tertiary)]">Verbosity:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateSettings({ aiVerbosity: lvl })}
                    className={`
                      w-6 h-6 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center
                      ${
                        settings.aiVerbosity === lvl
                          ? "bg-[var(--primary)] text-white shadow-md"
                          : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                      }
                    `}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            Atlas Context: <span className="text-[var(--primary)] font-medium">Tasks, Goals, Habits & Notes connected</span>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px] gap-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl p-6 shadow-2xl">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          onSelectPrompt={sendMessage}
        />

        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  );
}

