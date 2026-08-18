import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { PhoneControlSettings } from "@/types/phone-control";

const defaultSettings: PhoneControlSettings = {
  dailyLimitMinutes: 180, // Default 3 hours
  screenWakeTimeoutSeconds: 30, // 30s wake timeout
  disciplineMode: "strict",
  blacklistedAppCategories: ["social", "games", "short_videos"],
  customBlockedPackages: ["com.instagram.android", "com.zhiliaoapp.musically"],
  whitelistedApps: ["Atlas", "Phone", "Messages", "Calendar"],
  bedtimeLockEnabled: true,
  bedtimeStart: "22:00",
  bedtimeEnd: "06:00",
  selectedWorkoutType: "pushups",
  workoutTargetReps: 20,
  usageAccessGranted: false,
  overlayGranted: false,
  accessibilityGranted: false,
  isPhoneLocked: false,
  currentScreenTimeMinutes: 105,
  activeUnlockCondition: "hard_workout",
  temporaryUnlockMinutesRemaining: 0,
};

class PhoneControlRepository extends BaseRepository<PhoneControlSettings> {
  constructor() {
    super(STORAGE_KEYS.PHONE_CONTROL);
  }

  getSettings(): PhoneControlSettings {
    const list = this.getAll();
    if (list.length === 0) {
      this.saveSettings(defaultSettings);
      return defaultSettings;
    }
    // Merge defaults for new fields if any missing from previous saves
    return { ...defaultSettings, ...list[0] };
  }

  saveSettings(settings: PhoneControlSettings): void {
    this.save([settings]);
  }
}

export const phoneControlRepository = new PhoneControlRepository();
