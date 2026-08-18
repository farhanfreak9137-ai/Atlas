import { phoneControlRepository } from "@/repositories/phone-control.repository";
import { PhoneControlSettings, UnlockCondition, DisciplineMode, AppCategory, HardWorkoutType } from "@/types/phone-control";

export class PhoneControlService {
  static getSettings(): PhoneControlSettings {
    return phoneControlRepository.getSettings();
  }

  static updateSettings(partial: Partial<PhoneControlSettings>): PhoneControlSettings {
    const settings = phoneControlRepository.getSettings();
    const updated: PhoneControlSettings = {
      ...settings,
      ...partial,
    };
    phoneControlRepository.saveSettings(updated);
    return updated;
  }

  static updateDailyLimit(minutes: number): PhoneControlSettings {
    return this.updateSettings({ dailyLimitMinutes: Math.max(15, minutes) });
  }

  static updateWakeTimeout(seconds: number): PhoneControlSettings {
    return this.updateSettings({ screenWakeTimeoutSeconds: seconds });
  }

  static updateDisciplineMode(mode: DisciplineMode): PhoneControlSettings {
    return this.updateSettings({ disciplineMode: mode });
  }

  static toggleAppCategory(category: AppCategory): PhoneControlSettings {
    const settings = phoneControlRepository.getSettings();
    const exists = settings.blacklistedAppCategories.includes(category);
    const updatedCategories = exists
      ? settings.blacklistedAppCategories.filter((c) => c !== category)
      : [...settings.blacklistedAppCategories, category];

    return this.updateSettings({ blacklistedAppCategories: updatedCategories });
  }

  static toggleAppPackage(packageName: string): PhoneControlSettings {
    const settings = phoneControlRepository.getSettings();
    const exists = (settings.customBlockedPackages || []).includes(packageName);
    const updatedPackages = exists
      ? (settings.customBlockedPackages || []).filter((p) => p !== packageName)
      : [...(settings.customBlockedPackages || []), packageName];

    return this.updateSettings({ customBlockedPackages: updatedPackages });
  }

  static updateBedtime(enabled: boolean, start?: string, end?: string): PhoneControlSettings {
    return this.updateSettings({
      bedtimeLockEnabled: enabled,
      ...(start ? { bedtimeStart: start } : {}),
      ...(end ? { bedtimeEnd: end } : {}),
    });
  }

  static setSelectedWorkout(workout: HardWorkoutType, targetReps?: number): PhoneControlSettings {
    return this.updateSettings({
      selectedWorkoutType: workout,
      ...(targetReps ? { workoutTargetReps: targetReps } : {}),
    });
  }

  static updateUsageTime(screenTimeMinutes: number): PhoneControlSettings {
    const settings = phoneControlRepository.getSettings();
    const isExceeded = screenTimeMinutes >= settings.dailyLimitMinutes;
    const isLocked = isExceeded && settings.temporaryUnlockMinutesRemaining <= 0;

    const updated: PhoneControlSettings = {
      ...settings,
      currentScreenTimeMinutes: screenTimeMinutes,
      isPhoneLocked: isLocked,
      activeUnlockCondition: isLocked ? settings.activeUnlockCondition || "hard_workout" : null,
    };
    phoneControlRepository.saveSettings(updated);
    return updated;
  }

  static updatePermissionState(permissions: {
    usageAccessGranted?: boolean;
    overlayGranted?: boolean;
    accessibilityGranted?: boolean;
  }): PhoneControlSettings {
    return this.updateSettings(permissions);
  }

  static unlockTemporary(additionalMinutes: number = 15): PhoneControlSettings {
    return this.updateSettings({
      isPhoneLocked: false,
      temporaryUnlockMinutesRemaining: additionalMinutes,
      activeUnlockCondition: null,
    });
  }

  static setLockState(isLocked: boolean, condition?: UnlockCondition): PhoneControlSettings {
    return this.updateSettings({
      isPhoneLocked: isLocked,
      activeUnlockCondition: isLocked ? (condition || "hard_workout") : null,
    });
  }
}
