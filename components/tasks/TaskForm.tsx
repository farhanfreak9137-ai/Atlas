"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { TaskPriority } from "@/types/task";

interface TaskFormProps {
  onAdd: (
    title: string,
    priority: TaskPriority,
    dueDate: string
  ) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), priority, dueDate);

    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 lg:flex-row"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as TaskPriority)
        }
        className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
      >
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
      >
        <Plus size={18} />
        Add Task
      </button>
    </form>
  );
}