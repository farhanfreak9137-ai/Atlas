import { TaskService } from "./task.service";
import { HabitService } from "./habit.service";
import { GoalService } from "./goal.service";

export class DashboardService {
  static getOverview() {
    const tasks = TaskService.getStatistics();
    const habits = HabitService.getStatistics();
    const goals = GoalService.getStatistics();

    const productivity =
      Math.round(
        (
          tasks.completionRate +
          habits.completionRate +
          goals.completionRate
        ) / 3
      );

    return {
      tasks,
      habits,
      goals,
      productivity,
    };
  }
}