import { Task } from "@/types/task";
import { Habit } from "@/types/habit";

export function getTasks(): Task[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("atlas-tasks");

  return data ? JSON.parse(data) : [];
}

export function getHabits(): Habit[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("atlas-habits");

  return data ? JSON.parse(data) : [];
}