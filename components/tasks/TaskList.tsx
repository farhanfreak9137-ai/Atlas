"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { Task } from "@/types/task";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
  "atlas-tasks",
  []
);

  function addTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function toggleTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      <TaskForm onAdd={addTask} />

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center text-zinc-500">
          No tasks yet.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}