import { create } from "zustand";
import { PhoneControlSettings, UnlockCondition, DisciplineMode, AppCategory, HardWorkoutType } from "@/types/phone-control";
import { PhoneControlService } from "@/services/phone-control.service";
import { AtlasPhoneControl, AppItem } from "@/services/native-phone-control.bridge";

interface PhoneControlStore {
  settings: PhoneControlSettings;
  installedApps: AppItem[];

  load: () => Promise<void>;
  setDailyLimit: (minutes: number) => void;
  setWakeTimeout: (seconds: number) => void;
  setDisciplineMode: (mode: DisciplineMode) => void;
  setSelectedWorkout: (workout: HardWorkoutType, targetReps?: number) => void;
  toggleAppCategory: (category: AppCategory) => void;
  toggleAppPackage: (packageName: string) => void;
  setBedtime: (enabled: boolean, start?: string, end?: string) => void;
  updateScreenTime: (minutes: number) => void;
  setPermissions: (permissions: {
    usageAccessGranted?: boolean;
    overlayGranted?: boolean;
    accessibilityGranted?: boolean;
  }) => void;
  requestNativeUsageAccess: () => Promise<void>;
  requestNativeOverlay: () => Promise<void>;
  unlockTemporary: (additionalMinutes?: number) => void;
  setLockState: (isLocked: boolean, condition?: UnlockCondition) => void;
}

export const usePhoneControlStore = create<PhoneControlStore>((set, get) => ({
  settings: PhoneControlService.getSettings(),
  installedApps: [],

  load: async () => {
    const current = PhoneControlService.getSettings();

    try {
      const perms = await AtlasPhoneControl.checkPermissions();
      const usage = await AtlasPhoneControl.getTodayScreenTimeMinutes();
      const appsRes = await AtlasPhoneControl.getInstalledApps();

      const updated = PhoneControlService.updatePermissionState({
        usageAccessGranted: perms.usageAccessGranted,
        overlayGranted: perms.overlayGranted,
      });

      const finalSettings = PhoneControlService.updateUsageTime(usage.minutes || current.currentScreenTimeMinutes);
      set({
        settings: finalSettings,
        installedApps: appsRes.apps || [],
      });
    } catch {
      set({ settings: current });
    }
  },

  setDailyLimit: (minutes) => {
    const updated = PhoneControlService.updateDailyLimit(minutes);
    set({ settings: updated });
  },

  setWakeTimeout: (seconds) => {
    const updated = PhoneControlService.updateWakeTimeout(seconds);
    set({ settings: updated });
  },

  setDisciplineMode: (mode) => {
    const updated = PhoneControlService.updateDisciplineMode(mode);
    set({ settings: updated });
  },

  setSelectedWorkout: (workout, targetReps) => {
    const updated = PhoneControlService.setSelectedWorkout(workout, targetReps);
    set({ settings: updated });
  },

  toggleAppCategory: (category) => {
    const updated = PhoneControlService.toggleAppCategory(category);
    set({ settings: updated });
  },

  toggleAppPackage: (packageName) => {
    const updated = PhoneControlService.toggleAppPackage(packageName);
    set({ settings: updated });
  },

  setBedtime: (enabled, start, end) => {
    const updated = PhoneControlService.updateBedtime(enabled, start, end);
    set({ settings: updated });
  },

  updateScreenTime: (minutes) => {
    const updated = PhoneControlService.updateUsageTime(minutes);
    set({ settings: updated });
  },

  setPermissions: (permissions) => {
    const updated = PhoneControlService.updatePermissionState(permissions);
    set({ settings: updated });
  },

  requestNativeUsageAccess: async () => {
    try {
      await AtlasPhoneControl.requestUsageAccess();
    } catch (e) {
      console.error("Failed to request usage access", e);
    }
  },

  requestNativeOverlay: async () => {
    try {
      await AtlasPhoneControl.requestOverlayPermission();
    } catch (e) {
      console.error("Failed to request overlay permission", e);
    }
  },

  unlockTemporary: (additionalMinutes = 15) => {
    const updated = PhoneControlService.unlockTemporary(additionalMinutes);
    set({ settings: updated });
  },

  setLockState: (isLocked, condition) => {
    const updated = PhoneControlService.setLockState(isLocked, condition);
    set({ settings: updated });
  },
}));
