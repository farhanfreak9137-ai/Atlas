import { create } from "zustand";

import { Task, TaskPriority } from "@/types/task";
import { TaskService } from "@/services/task.service";

interface TaskStore {
  tasks: Task[];

  load: () => void;

  createTask: (
    title: string,
    priority: TaskPriority,
    dueDate: string
  ) => void;

  toggleTask: (id: string) => void;

  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  load: () =>
    set({
      tasks: TaskService.getAll(),
    }),

  createTask: (
    title,
    priority,
    dueDate
  ) => {
    TaskService.create(
      title,
      priority,
      dueDate
    );

    set({
      tasks: TaskService.getAll(),
    });
  },

  toggleTask: (id) => {
    TaskService.toggle(id);

    set({
      tasks: TaskService.getAll(),
    });
  },

  deleteTask: (id) => {
    TaskService.delete(id);

    set({
      tasks: TaskService.getAll(),
    });
  },
}));