import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "task" | "habit" | "goal" | "reminder" | "system";
  category: "tasks" | "habits" | "goals" | "reminders" | "gym" | "calendar";
  timestamp: string;
  read: boolean;
  link?: string;
}

interface NotificationStore {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  getUnreadCount: (enabledCategories?: string[]) => number;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "High Priority Task",
    message: "Finish project homework is due today",
    type: "task",
    category: "tasks",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    link: "/tasks",
  },
  {
    id: "notif-2",
    title: "Habit Streak Milestone",
    message: "🔥 Drink Water is on a 5-day streak!",
    type: "habit",
    category: "habits",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    link: "/habits",
  },
  {
    id: "notif-3",
    title: "Goal Deadline Approaching",
    message: "🎯 Target deadline for 5kg weight gain is tomorrow",
    type: "goal",
    category: "goals",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    read: true,
    link: "/goals",
  },
  {
    id: "notif-4",
    title: "Welcome to Atlas AI OS",
    message: "Your command center is active and synchronized.",
    type: "system",
    category: "reminders",
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    read: true,
  },
];

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: DEFAULT_NOTIFICATIONS,

      addNotification: (item) => {
        const newNotif: NotificationItem = {
          ...item,
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      getUnreadCount: (enabledCategories) => {
        const list = get().notifications;
        return list.filter((n) => {
          if (n.read) return false;
          if (enabledCategories && enabledCategories.length > 0) {
            return enabledCategories.includes(n.category);
          }
          return true;
        }).length;
      },
    }),
    {
      name: "atlas-notifications",
    }
  )
);
