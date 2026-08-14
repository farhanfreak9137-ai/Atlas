"use client";

import { useState } from "react";
import { Note } from "@/types/note";
import { Pencil, Trash2, Clock, Check, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface NoteCardProps {
  note: Note;
  onUpdate: (
    id: string,
    title: string,
    content: string
  ) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({
  note,
  onUpdate,
  onDelete,
}: NoteCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  if (editing) {
    return (
      <GlassCard className="p-6">
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] px-4 py-2.5 text-base font-semibold font-heading text-[var(--text)] outline-none focus:border-emerald-500/50"
            placeholder="Note title"
          />

          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] px-4 py-3 text-sm text-[var(--text-secondary)] outline-none focus:border-emerald-500/50"
            placeholder="Note content"
          />

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                onUpdate(note.id, title, content);
                setEditing(false);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm"
            >
              <Check size={14} /> Save
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setTitle(note.title);
                setContent(note.content);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-2,rgba(255,255,255,0.08))] border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text)]"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 flex flex-col justify-between space-y-4 h-full">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold font-heading text-[var(--text)]">
            {note.title}
          </h3>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg p-2 text-[var(--text-tertiary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
              aria-label="Edit note"
            >
              <Pencil size={15} />
            </button>

            <button
              onClick={() => onDelete(note.id)}
              className="rounded-lg p-2 text-[var(--text-tertiary)] hover:text-rose-400 hover:bg-rose-500/10 transition"
              aria-label="Delete note"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        <p className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] leading-relaxed">
          {note.content}
        </p>
      </div>

      <div className="pt-2 border-t border-[var(--border)] flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)] font-medium">
        <Clock size={13} className="text-[var(--text-tertiary)]" />
        <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
      </div>
    </GlassCard>
  );
}