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

export function TaskForm({
  onAdd,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
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
      className="grid gap-3 sm:grid-cols-12 items-center"
    >
      <div className="sm:col-span-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--primary)]/50"
        />
      </div>

      <div className="sm:col-span-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--primary)]/50 [&>option]:bg-[var(--popover)] [&>option]:text-[var(--popover-foreground)]"
        >
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
      </div>

      <div className="sm:col-span-3 flex gap-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--primary)]/50"
        />

        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.99]"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
    </form>
  );
}