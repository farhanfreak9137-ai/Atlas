import { goalRepository } from "@/repositories/goal.repository";
import { Goal, GoalCategory } from "@/types/goal";

export class GoalService {
  static getAll(): Goal[] {
    return goalRepository.getAll();
  }

  static create(
    title: string,
    category: GoalCategory,
    target: number,
    deadline: string
  ) {
    const goals = goalRepository.getAll();

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title,
      category,
      target,
      current: 0,
      deadline,
      completed: false,
    };

    goals.push(newGoal);

    goalRepository.save(goals);

    return newGoal;
  }

  static updateProgress(
    id: string,
    current: number
  ) {
    const updated = goalRepository.getAll().map((goal) => {
      if (goal.id !== id) return goal;

      return {
        ...goal,
        current,
        completed: current >= goal.target,
      };
    });

    goalRepository.save(updated);
  }

  static delete(id: string) {
    const updated = goalRepository
      .getAll()
      .filter((goal) => goal.id !== id);

    goalRepository.save(updated);
  }

  static getStatistics() {
    const goals = goalRepository.getAll();

    const total = goals.length;

    const completed = goals.filter(
      (goal) => goal.completed
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