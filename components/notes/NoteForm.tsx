"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Plus, StickyNote } from "lucide-react";

interface NoteFormProps {
  onAdd: (title: string, content: string) => void;
}

export function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    onAdd(title.trim(), content.trim());

    setTitle("");
    setContent("");
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <StickyNote size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-semibold font-heading text-[var(--text)]">
            Create Note
          </h2>
        </div>

        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--primary)]/50"
        />

        <textarea
          placeholder="Write your note content here..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--primary)]/50"
        />

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.99]"
          >
            <Plus size={17} />
            Add Note
          </button>
        </div>
      </form>
    </GlassCard>
  );
}