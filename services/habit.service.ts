import { habitRepository } from "@/repositories/habit.repository";
import { Habit } from "@/types/habit";

export class HabitService {
  static getAll(): Habit[] {
    return habitRepository.getAll();
  }

  static create(
    title: string,
    icon: string,
    color: string,
    target: number
  ) {
    const habits = habitRepository.getAll();

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      icon,
      color,
      target,
      progress: 0,
      streak: 0,
      completedToday: false,
    };

    habits.push(newHabit);

    habitRepository.save(habits);

    return newHabit;
  }

  static toggle(id: string) {
    const habits = habitRepository.getAll();

    const updated = habits.map((habit) => {
      if (habit.id !== id) return habit;

      const completed = !habit.completedToday;

      return {
        ...habit,
        completedToday: completed,
        progress: completed ? habit.target : 0,
        streak: completed
          ? habit.streak + 1
          : Math.max(0, habit.streak - 1),
      };
    });

    habitRepository.save(updated);
  }

  static delete(id: string) {
    const updated = habitRepository
      .getAll()
      .filter((habit) => habit.id !== id);

    habitRepository.save(updated);
  }

  static getStatistics() {
    const habits = habitRepository.getAll();

    const total = habits.length;

    const completed = habits.filter(
      (habit) => habit.completedToday
    ).length;

    return {
      total,
      completed,
      active: total - completed,
      completionRate:
        total === 0
          ? 0
          : Math.round((completed / total) * 100),
    };
  }
}