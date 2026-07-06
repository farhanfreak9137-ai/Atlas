"use client";

import { FormEvent, useState } from "react";
import { GoalCategory } from "@/types/goal";

interface GoalFormProps {
  onAdd: (
    title: string,
    category: GoalCategory,
    target: number,
    deadline: string
  ) => void;
}

export function GoalForm({ onAdd }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<GoalCategory>("personal");
  const [target, setTarget] = useState(1);
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(
      title.trim(),
      category,
      target,
      deadline
    );

    setTitle("");
    setCategory("personal");
    setTarget(1);
    setDeadline("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
    >
      <h2 className="text-xl font-semibold">
        Create Goal
      </h2>

      <input
        type="text"
        placeholder="Goal title..."
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as GoalCategory
            )
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        >
          <option value="fitness">
            Fitness
          </option>
          <option value="study">
            Study
          </option>
          <option value="career">
            Career
          </option>
          <option value="football">
            Football
          </option>
          <option value="personal">
            Personal
          </option>
        </select>

        <input
          type="number"
          min={1}
          value={target}
          onChange={(e) =>
            setTarget(Number(e.target.value))
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />
      </div>

      <button
        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
      >
        Add Goal
      </button>
    </form>
  );
}