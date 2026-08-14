"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/stores/task.store";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchBar } from "@/components/common/SearchBar";

import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const {
    tasks,
    load,
    createTask,
    toggleTask,
    deleteTask,
  } = useTaskStore();

  useEffect(() => {
    load();
  }, [load]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

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
    <div className="space-y-6">
      {/* Create Task Form */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold font-heading text-[var(--text)] mb-4">
          Add New Task
        </h2>
        <TaskForm onAdd={createTask} />
      </GlassCard>

      {/* Task List Main Card */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold font-heading text-[var(--text)]">
              My Tasks
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-normal">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-xl bg-[var(--surface-2,rgba(255,255,255,0.05))] p-1 border border-[var(--border)]">
            {(["all", "active", "completed"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 capitalize ${
                  filter === value
                    ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search tasks by title..."
        />

        {filteredTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description="Add a new task above or adjust your search filter."
          />
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}