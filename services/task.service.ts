import { taskRepository } from "@/repositories/task.repository";
import { Task, TaskPriority } from "@/types/task";

export class TaskService {
  static getAll(): Task[] {
    return taskRepository.getAll();
  }

  static create(
    title: string,
    priority: TaskPriority,
    dueDate: string
  ) {
    const tasks = taskRepository.getAll();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate,
    };

    tasks.push(newTask);

    taskRepository.save(tasks);

    return newTask;
  }

  static toggle(id: string) {
    const tasks = taskRepository.getAll();

    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    taskRepository.save(updated);
  }

  static delete(id: string) {
    const updated = taskRepository
      .getAll()
      .filter((task) => task.id !== id);

    taskRepository.save(updated);
  }

  static search(query: string) {
    return taskRepository
      .getAll()
      .filter((task) =>
        task.title
          .toLowerCase()
          .includes(query.toLowerCase())
      );
  }

  static getStatistics() {
    const tasks = taskRepository.getAll();

    const total = tasks.length;

    const completed = tasks.filter(
      (t) => t.completed
    ).length;

    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate:
        total === 0
          ? 0
          : Math.round(
              (completed / total) * 100
            ),
    };
  }
}