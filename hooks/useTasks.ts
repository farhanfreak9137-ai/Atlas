"use client";

import { useEffect, useState } from "react";

import { Task, TaskPriority } from "@/types/task";
import { TaskService } from "@/services/task.service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function refresh() {
    setTasks(TaskService.getAll());
  }

  useEffect(() => {
    refresh();
  }, []);

  function create(
    title: string,
    priority: TaskPriority,
    dueDate: string
  ) {
    TaskService.create(title, priority, dueDate);
    refresh();
  }

  function toggle(id: string) {
    TaskService.toggle(id);
    refresh();
  }

  function remove(id: string) {
    TaskService.delete(id);
    refresh();
  }

  return {
    tasks,
    create,
    toggle,
    remove,
    refresh,
  };
}