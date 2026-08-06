import { TaskService } from "./task.service";
import { HabitService } from "./habit.service";
import { GoalService } from "./goal.service";
import { GymService } from "./gym.service";
import { FootballService } from "./football.service";

export class DashboardService {
  static getOverview() {
    const tasks = TaskService.getStatistics();
    const habits = HabitService.getStatistics();
    const goals = GoalService.getStatistics();

    const allTasks = TaskService.getAll();
    const allHabits = HabitService.getAll();
    const allGoals = GoalService.getAll();

    const gymStats = GymService.getStats();
    const footballStats = FootballService.getStats();

    const productivity = Math.round(
      (
        tasks.completionRate +
        habits.completionRate +
        goals.completionRate
      ) / 3
    );

    const highestPriorityTask =
      allTasks.find(
        (task) =>
          !task.completed &&
          task.priority === "high"
      ) ??
      allTasks.find(
        (task) => !task.completed
      ) ??
      null;

    const longestHabitStreak =
      allHabits.length > 0
        ? allHabits.reduce((best, current) =>
            current.streak > best.streak
              ? current
              : best
          )
        : null;

    const nearestGoalDeadline =
      allGoals
        .filter(
          (goal) =>
            !goal.completed &&
            goal.deadline
        )
        .sort(
          (a, b) =>
            new Date(a.deadline).getTime() -
            new Date(b.deadline).getTime()
        )[0] ?? null;

    return {
      productivity,

      tasks,
      habits,
      goals,

      highestPriorityTask,
      longestHabitStreak,
      nearestGoalDeadline,
      gymStats,
      footballStats,
    };
  }
}

export function getDashboardData() {
  return DashboardService.getOverview();
}