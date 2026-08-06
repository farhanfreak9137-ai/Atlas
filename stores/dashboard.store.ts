import { create } from "zustand";

interface DashboardState {
  // Dashboard related state
  theme: "light" | "dark" | "auto";
  layout: "grid" | "list";
  notifications: boolean;
}

export interface SettingsState {
  theme: "light" | "dark" | "auto";
  aiVerbosity: number;
  rememberHistory: boolean;
  autoLockTime: number;
  notificationType: string;
  activeWidgets: string[];
  fontSize: "small" | "medium" | "large";
  contrastMode: "normal" | "high";
}

export const useDashboardStore = create<
  {
    dashboard: DashboardState;
    settings: SettingsState;
    updateDashboard: (partial: Partial<DashboardState>) => void;
    updateSettings: (partial: Partial<SettingsState>) => void;
  }
>(set => ({
  dashboard: {
    theme: "dark",
    layout: "grid",
    notifications: true,
  },
  settings: {
    theme: "dark",
    aiVerbosity: 3,
    rememberHistory: true,
    autoLockTime: 5,
    notificationType: "all",
    activeWidgets: ["tasks", "habits", "goals"],
    fontSize: "medium",
    contrastMode: "normal",
  },
  updateDashboard: (partial: Partial<DashboardState>) => set(state => ({ dashboard: { ...state.dashboard, ...partial } })),
  updateSettings: (partial: Partial<SettingsState>) => set(state => ({ settings: { ...state.settings, ...partial } })),
}));