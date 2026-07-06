"use client";

import { useState } from "react";

import { useTasks } from "@/hooks/useTasks";

import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const {
    tasks,
    create,
    toggle,
    remove,
  } = useTasks();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-xl backdrop-blur">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            My Tasks
          </h2>

          <p className="text-sm text-zinc-400">
            {filteredTasks.length} Task
            {filteredTasks.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-2">
          {["all", "active", "completed"].map((value) => (
            <button
              key={value}
              onClick={() =>
                setFilter(
                  value as
                    | "all"
                    | "active"
                    | "completed"
                )
              }
              className={`rounded-xl px-4 py-2 transition ${
                filter === value
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {value.charAt(0).toUpperCase() +
                value.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
      />

      <div className="mb-8">
        <TaskForm onAdd={create} />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
          <h3 className="text-lg font-semibold text-white">
            No tasks found
          </h3>

          <p className="mt-2 text-zinc-500">
            Add a new task or change your search.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}