import { taskRepository } from "@/repositories/task.repository";
import { Task, TaskPriority } from "@/types/task";

export class TaskService {
  static getAll(): Task[] {
    return taskRepository.getAll();
  }

  static create(
    title: string,
    priority: TaskPriority,
    dueDate?: string
  ): Task {
    const tasks = taskRepository.getAll();

    const now = new Date().toISOString();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate,
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(newTask);
    taskRepository.save(tasks);

    return newTask;
  }

  static toggle(id: string): void {
    const updated = taskRepository.getAll().map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            updatedAt: new Date().toISOString(),
          }
        : task
    );

    taskRepository.save(updated);
  }

  static delete(id: string): void {
    const updated = taskRepository
      .getAll()
      .filter((task) => task.id !== id);

    taskRepository.save(updated);
  }

  static search(query: string): Task[] {
    return taskRepository
      .getAll()
      .filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
  }

  static getStatistics(): {
    total: number;
    completed: number;
    active: number;
    completionRate: number;
  } {
    const tasks = taskRepository.getAll();

    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate:
        total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }
}