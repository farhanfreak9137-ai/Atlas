"use client";

import { useState } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Copy, Check, Terminal, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

// ---------------------------------------------------------------------------
// Formatted Markdown Content Renderer
// ---------------------------------------------------------------------------
function FormattedContent({ content }: { content: string }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Split content by fenced code blocks: ```lang ... ```
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  const parts: Array<{ type: "text" | "code"; content: string; lang?: string }> = [];

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      lang: match[1] || "text",
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.substring(lastIndex),
    });
  }

  return (
    <div className="space-y-3 overflow-hidden">
      {parts.map((part, idx) => {
        if (part.type === "code") {
          const isCopied = copiedCodeIdx === idx;
          return (
            <div
              key={idx}
              className="my-2 rounded-xl overflow-hidden border border-white/10 bg-slate-950/80 font-mono text-xs shadow-inner code-block-shine"
            >
              {/* Terminal-style header with traffic light dots */}
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.04] border-b border-white/10 text-zinc-400">
                <div className="flex items-center gap-3">
                  {/* macOS traffic dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57] opacity-80" />
                    <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e] opacity-80" />
                    <span className="h-[10px] w-[10px] rounded-full bg-[#28c840] opacity-80" />
                  </div>
                  {/* Language label tab */}
                  <div className="flex items-center gap-1.5 text-[11px] font-sans">
                    <Terminal size={13} className="text-emerald-400" />
                    <span className="text-zinc-300">{part.lang || "code"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(part.content, idx)}
                  className="flex items-center gap-1 text-[11px] hover:text-emerald-400 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-emerald-200 leading-relaxed font-mono">
                <code>{part.content}</code>
              </pre>
            </div>
          );
        }

        // Process text lines (lists, bold, inline code, headings)
        const lines = part.content.split("\n");
        return (
          <div key={idx} className="space-y-1.5">
            {lines.map((line, lineIdx) => {
              if (!line.trim()) return <div key={lineIdx} className="h-1" />;

              // Heading line (# or ##)
              if (line.startsWith("# ")) {
                return (
                  <h3 key={lineIdx} className="text-base font-bold text-[var(--primary)] mt-2 mb-1">
                    {line.replace("# ", "")}
                  </h3>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h4 key={lineIdx} className="text-sm font-bold text-[var(--primary)] mt-2 mb-1">
                    {line.replace("## ", "")}
                  </h4>
                );
              }

              // List line (- or * or digit.)
              const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
              const isNumbered = /^\d+\.\s/.test(line.trim());

              const cleanLine = isBullet
                ? line.trim().replace(/^[-*]\s+/, "")
                : isNumbered
                ? line.trim().replace(/^\d+\.\s+/, "")
                : line;

              // Parse inline bold (**bold**) & inline code (`code`)
              const formattedSegments = renderInlineFormatting(cleanLine);

              if (isBullet || isNumbered) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-[var(--primary)] font-bold text-xs mt-1">
                      {isBullet ? "•" : `${line.trim().match(/^\d+/)?.[0]}.`}
                    </span>
                    <span className="flex-1 text-[var(--text)]">{formattedSegments}</span>
                  </div>
                );
              }

              return <p key={lineIdx} className="text-[var(--text)] leading-relaxed">{formattedSegments}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper for inline **bold** and `code`
// ---------------------------------------------------------------------------
function renderInlineFormatting(text: string) {
  // Regex to match **bold** or `code`
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[var(--primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-[var(--surface-2,rgba(0,0,0,0.06))] px-1.5 py-0.5 font-mono text-xs text-[var(--primary)] border border-[var(--border)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// ---------------------------------------------------------------------------
// Main ChatMessage Component
// ---------------------------------------------------------------------------
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div
      className={`group flex gap-3 animate-in fade-in slide-in-from-bottom-2 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <Avatar
        className={`mt-1 h-8 w-8 flex-shrink-0 ${
          isUser
            ? "ring-2 ring-[var(--primary)]/30"
            : "ring-2 ring-[var(--primary)]/20"
        }`}
      >
        <AvatarImage
          src={
            isUser
              ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              : "https://api.dicebear.com/7.x/bottts/svg?seed=atlas"
          }
          alt={isUser ? "You" : "Atlas AI"}
        />
        <AvatarFallback
          className={`font-bold text-white text-xs ${
            isUser
              ? "bg-[var(--primary)]"
              : "bg-gradient-to-br from-[var(--primary)] to-teal-600"
          }`}
        >
          {isUser ? "U" : "A"}
        </AvatarFallback>
      </Avatar>

      <div
        className={`max-w-xl sm:max-w-2xl flex flex-col gap-1.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Message bubble */}
        <div
          className={`
            relative
            rounded-2xl
            px-4
            py-3
            text-sm
            leading-relaxed
            shadow-md
            ${
              isUser
                ? "rounded-tr-none bg-gradient-to-r from-[var(--primary)] to-teal-500 text-white font-medium"
                : `
                  rounded-tl-none
                  glass
                  border
                  border-[var(--border)]
                  text-[var(--text)]
                  bg-[var(--card)]
                `
            }
          `}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <FormattedContent content={message.content} />
          )}
        </div>

        {/* Meta row: timestamp + hover action buttons */}
        <div
          className={`flex items-center gap-2 px-1 ${
            isUser ? "flex-row-reverse" : ""
          }`}
        >
          <span className="text-[11px] text-[var(--text-tertiary,#64748b)] flex items-center gap-1">
            <span>{isUser ? "You" : "Atlas AI"}</span>
            <span>·</span>
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>

          {/* Hover action buttons — AI messages only */}
          {!isUser && (
            <div
              className="
                flex items-center gap-1
                opacity-0 group-hover:opacity-100
                transition-opacity duration-150
              "
            >
              {/* Copy */}
              <button
                type="button"
                onClick={handleCopyMessage}
                title="Copy response"
                className="
                  flex items-center justify-center
                  h-6 w-6
                  rounded-md
                  bg-[var(--surface-2,rgba(255,255,255,0.06))]
                  border border-[var(--border)]
                  text-[var(--text-tertiary,#64748b)]
                  hover:text-[var(--primary)]
                  focus-visible:outline-2
                  focus-visible:outline-[var(--primary)]
                "
                style={{ transition: "color 150ms ease, background-color 150ms ease" }}
              >
                {copiedMsg ? (
                  <Check size={12} className="text-[var(--primary)]" />
                ) : (
                  <Copy size={12} />
                )}
              </button>

              {/* Thumbs up */}
              <button
                type="button"
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                title="Good response"
                className={`
                  flex items-center justify-center
                  h-6 w-6
                  rounded-md
                  border border-[var(--border)]
                  focus-visible:outline-2
                  focus-visible:outline-[var(--primary)]
                  ${
                    feedback === "up"
                      ? "bg-[var(--color-success-bg,rgba(34,197,94,0.1))] text-[var(--color-success,#22c55e)] border-[var(--color-success,#22c55e)]/30"
                      : "bg-[var(--surface-2,rgba(255,255,255,0.06))] text-[var(--text-tertiary,#64748b)] hover:text-[var(--color-success,#22c55e)]"
                  }
                `}
                style={{ transition: "color 150ms ease, background-color 150ms ease, border-color 150ms ease" }}
              >
                <ThumbsUp size={12} />
              </button>

              {/* Thumbs down */}
              <button
                type="button"
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                title="Bad response"
                className={`
                  flex items-center justify-center
                  h-6 w-6
                  rounded-md
                  border border-[var(--border)]
                  focus-visible:outline-2
                  focus-visible:outline-[var(--primary)]
                  ${
                    feedback === "down"
                      ? "bg-[var(--color-danger-bg,rgba(239,68,68,0.1))] text-[var(--color-danger,#ef4444)] border-[var(--color-danger,#ef4444)]/30"
                      : "bg-[var(--surface-2,rgba(255,255,255,0.06))] text-[var(--text-tertiary,#64748b)] hover:text-[var(--color-danger,#ef4444)]"
                  }
                `}
                style={{ transition: "color 150ms ease, background-color 150ms ease, border-color 150ms ease" }}
              >
                <ThumbsDown size={12} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

