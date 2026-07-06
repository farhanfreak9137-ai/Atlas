import { getHabits, getTasks } from "./atlas";

export function getDashboardStats() {
  const tasks = getTasks();
  const habits = getHabits();

  const completedTasks =
    tasks.filter((t) => t.completed).length;

  const completedHabits =
    habits.filter((h) => h.completedToday).length;

  return {
    totalTasks: tasks.length,
    completedTasks,

    totalHabits: habits.length,
    completedHabits,

    taskProgress:
      tasks.length === 0
        ? 0
        : Math.round(
            (completedTasks / tasks.length) * 100
          ),

    habitProgress:
      habits.length === 0
        ? 0
        : Math.round(
            (completedHabits / habits.length) * 100
          ),
  };
}