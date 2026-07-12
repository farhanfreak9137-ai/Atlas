import { reminderRepository } from "@/repositories/reminder.repository";
import { Reminder } from "@/types/reminder";

export class ReminderService {
  static getAll(): Reminder[] {
    return reminderRepository.getAll();
  }

  static create(
    title: string,
    description: string,
    dueDate: string
  ): Reminder {
    const reminders = reminderRepository.getAll();

    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    reminders.push(newReminder);

    reminderRepository.save(reminders);

    return newReminder;
  }

  static toggle(id: string): void {
    const updated = reminderRepository
      .getAll()
      .map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder
      );

    reminderRepository.save(updated);
  }

  static delete(id: string): void {
    const updated = reminderRepository
      .getAll()
      .filter((reminder) => reminder.id !== id);

    reminderRepository.save(updated);
  }

  static search(query: string): Reminder[] {
    const value = query.toLowerCase();

    return reminderRepository.getAll().filter(
      (reminder) =>
        reminder.title
          .toLowerCase()
          .includes(value) ||
        reminder.description
          .toLowerCase()
          .includes(value)
    );
  }

  static getUpcoming(): Reminder[] {
    return reminderRepository
      .getAll()
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      );
  }

  static getStatistics() {
    const reminders = reminderRepository.getAll();

    const total = reminders.length;

    const completed = reminders.filter(
      (r) => r.completed
    ).length;

    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate:
        total === 0
          ? 0
          : Math.round(
              (completed / total) * 100
            ),
    };
  }
}