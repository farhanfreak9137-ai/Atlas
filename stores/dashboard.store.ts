import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardState {
  theme: "light" | "dark" | "auto";
  layout: "grid" | "list";
  notifications: boolean;
}

export interface SettingsState {
  // Appearance
  theme: "light" | "dark" | "auto";
  accentColor: string; // hex, e.g. "#1F7A5B"
  fontSize: "small" | "medium" | "large";

  // AI Behavior
  aiVerbosity: number; // 1–5
  creativeMode: boolean;
  rememberHistory: boolean;

  // Privacy
  autoLockTime: number; // minutes, 0 = disabled
  dataRetention: "session" | "week" | "month" | "forever";

  // Notifications — which categories are enabled
  notificationCategories: string[]; // e.g. ["tasks","habits"]

  // Dashboard
  activeWidgets: string[];
  dashboardLayout: "grid" | "list" | "compact";

  // Accessibility
  reducedMotion: boolean;
  contrastMode: "normal" | "high";
}

interface StoreShape {
  dashboard: DashboardState;
  settings: SettingsState;
  updateDashboard: (partial: Partial<DashboardState>) => void;
  updateSettings: (partial: Partial<SettingsState>) => void;
}

export const useDashboardStore = create<StoreShape>()(
  persist(
    (set) => ({
      dashboard: {
        theme: "dark",
        layout: "grid",
        notifications: true,
      },
      settings: {
        // Appearance
        theme: "dark",
        accentColor: "#10B981",
        fontSize: "medium",

        // AI
        aiVerbosity: 3,
        creativeMode: false,
        rememberHistory: true,

        // Privacy
        autoLockTime: 0,
        dataRetention: "forever",

        // Notifications
        notificationCategories: ["tasks", "habits", "goals", "reminders"],

        // Dashboard
        activeWidgets: ["tasks", "habits", "goals", "calendar", "aiInsights", "statistics"],
        dashboardLayout: "grid",

        // Accessibility
        reducedMotion: false,
        contrastMode: "normal",
      },
      updateDashboard: (partial) =>
        set((state) => ({ dashboard: { ...state.dashboard, ...partial } })),
      updateSettings: (partial) =>
        set((state) => ({ settings: { ...state.settings, ...partial } })),
    }),
    {
      name: "atlas-settings", // localStorage key
      partialize: (state) => ({ settings: state.settings }), // only persist settings
    }
  )
);