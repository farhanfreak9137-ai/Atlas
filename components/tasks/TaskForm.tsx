"use client";

import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title);

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}