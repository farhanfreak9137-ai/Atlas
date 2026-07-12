"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { TaskPriority } from "@/types/task";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

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
  const [priority, setPriority] =
    useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(
      title.trim(),
      priority,
      dueDate
    );

    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 lg:flex-row"
    >
      <GlassInput
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as TaskPriority
          )
        }
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--glass)]
          px-4
          py-3
          text-[var(--text)]
          backdrop-blur-xl
          outline-none
          transition-all
          duration-200
          focus:border-[var(--primary)]
        "
      >
        <option value="high">
          🔴 High
        </option>

        <option value="medium">
          🟡 Medium
        </option>

        <option value="low">
          🟢 Low
        </option>
      </select>

      <GlassInput
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        className="w-auto"
      />

      <GlassButton
        type="submit"
        className="flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Task
      </GlassButton>
    </form>
  );
}