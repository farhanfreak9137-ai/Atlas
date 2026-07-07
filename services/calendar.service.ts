import { CalendarEvent } from "@/types/calendar";

import { TaskService } from "./task.service";
import { HabitService } from "./habit.service";
import { GoalService } from "./goal.service";

export class CalendarService {
  static getEvents(): CalendarEvent[] {
    const taskEvents = TaskService.getAll()
      .filter((task) => task.dueDate)
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        type: "task" as const,
      }));

    const goalEvents = GoalService.getAll()
      .filter((goal) => goal.deadline)
      .map((goal) => ({
        id: goal.id,
        title: goal.title,
        date: goal.deadline,
        type: "goal" as const,
      }));

    // Habits happen every day for now
    const today = new Date().toISOString().split("T")[0];

    const habitEvents = HabitService.getAll().map((habit) => ({
      id: habit.id,
      title: habit.title,
      date: today,
      type: "habit" as const,
    }));

    return [
      ...taskEvents,
      ...goalEvents,
      ...habitEvents,
    ];
  }

  static getEventsForDate(date: string) {
    return this.getEvents().filter(
      (event) => event.date === date
    );
  }
}