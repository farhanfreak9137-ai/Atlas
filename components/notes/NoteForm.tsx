"use client";

import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur"
    >
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Write your note..."
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-500"
      >
        Add Note
      </button>
    </form>
  );
}