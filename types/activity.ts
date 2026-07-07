export interface Activity {
  id: string;
  title: string;
  time: string;
  type: "task" | "habit" | "goal";
}