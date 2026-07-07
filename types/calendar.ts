export type CalendarEventType =
  | "task"
  | "habit"
  | "goal";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: CalendarEventType;
}