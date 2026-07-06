"use client";

import { FormEvent, useState } from "react";

interface HabitFormProps {
  onAdd: (
    title: string,
    icon: string,
    color: string,
    target: number
  ) => void;
}

export function HabitForm({ onAdd }: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("💧");
  const [color, setColor] = useState("blue");
  const [target, setTarget] = useState(8);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), icon, color, target);

    setTitle("");
    setIcon("💧");
    setColor("blue");
    setTarget(8);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
    >
      <h2 className="text-xl font-semibold text-white">
        Create Habit
      </h2>

      <input
        type="text"
        placeholder="Habit name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="💧"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />

        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>

        <input
          type="number"
          min={1}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
      >
        Add Habit
      </button>
    </form>
  );
}