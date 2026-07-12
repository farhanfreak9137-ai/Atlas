"use client";

import { useEffect, useState } from "react";

import { Task, TaskPriority } from "@/types/task";
import { TaskService } from "@/services/task.service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = (): void => {
    setTasks(TaskService.getAll());
  };

  useEffect(() => {
    refresh();
  }, []);

  const create = (
    title: string,
    priority: TaskPriority,
    dueDate?: string
  ): void => {
    TaskService.create(title, priority, dueDate);
    refresh();
  };

  const toggle = (id: string): void => {
    TaskService.toggle(id);
    refresh();
  };

  const remove = (id: string): void => {
    TaskService.delete(id);
    refresh();
  };

  return {
    tasks,
    create,
    toggle,
    remove,
    refresh,
  };
}