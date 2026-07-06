export type GoalCategory =
  | "fitness"
  | "study"
  | "career"
  | "football"
  | "personal";

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;

  target: number;
  current: number;

  deadline: string;

  completed: boolean;
}