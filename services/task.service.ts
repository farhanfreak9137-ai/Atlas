import { Task } from "@/types/task";

const tasks: Task[] = [];

export function getTasks() {
  return tasks;
}

export function addTask(title: string) {
  tasks.push({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });
}

export function deleteTask(id: string) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

export function toggleTask(id: string) {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = !task.completed;
  }
}