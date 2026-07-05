"use client";

import { useState } from "react";
import { TaskPriority } from "@/types/task";

interface TaskFormProps {
  onAdd: (
    title: string,
    priority: TaskPriority
  ) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] =
  useState<TaskPriority>("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title, priority);

    setTitle("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

<select
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value as TaskPriority)
  }
  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3"
>
  <option value="high">🔴 High</option>
  <option value="medium">🟡 Medium</option>
  <option value="low">🟢 Low</option>
</select>

      <button
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}