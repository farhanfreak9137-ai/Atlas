export interface Habit {
  id: string;
  title: string;
  icon: string;
  color: string;
  target: number;
  progress: number;
  streak: number;
  completedToday: boolean;
}