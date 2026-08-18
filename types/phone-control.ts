export type HardWorkoutType =
  | "pushups"
  | "burpees"
  | "squats"
  | "plank";

export type UnlockCondition =
  | "hard_workout"
  | "habit_completion"
  | "cooldown_timer";

export type DisciplineMode = "gentle" | "strict" | "hardcore";

export type AppCategory = "social" | "games" | "streaming" | "short_videos";

export interface PhoneEnforcementRule {
  enabled: boolean;
  type: "max_screen_time" | "app_limit";
  maxMinutes: number; // e.g. 180 for 3 hours
  blockedPackages?: string[];
  unlockCondition: UnlockCondition;
  unlockRequirementCount?: number;
  isLocked: boolean;
  currentUsageMinutes: number;
}

export interface PhoneControlSettings {
  dailyLimitMinutes: number; // e.g. 180 (3 hours)
  screenWakeTimeoutSeconds: number; // e.g. 30 seconds
  disciplineMode: DisciplineMode;
  blacklistedAppCategories: AppCategory[];
  customBlockedPackages: string[];
  whitelistedApps: string[];
  bedtimeLockEnabled: boolean;
  bedtimeStart: string; // e.g. "22:00"
  bedtimeEnd: string; // e.g. "06:00"
  selectedWorkoutType: HardWorkoutType;
  workoutTargetReps: number; // e.g. 20 pushups
  usageAccessGranted: boolean;
  overlayGranted: boolean;
  accessibilityGranted: boolean;
  isPhoneLocked: boolean;
  currentScreenTimeMinutes: number;
  activeUnlockCondition: UnlockCondition | null;
  temporaryUnlockMinutesRemaining: number;
}
