import { registerPlugin } from "@capacitor/core";

export interface AppItem {
  appName: string;
  packageName: string;
}

export interface AtlasPhoneControlPluginInterface {
  checkPermissions(): Promise<{
    usageAccessGranted: boolean;
    overlayGranted: boolean;
  }>;
  requestUsageAccess(): Promise<void>;
  requestOverlayPermission(): Promise<void>;
  getTodayScreenTimeMinutes(): Promise<{ minutes: number }>;
  getInstalledApps(): Promise<{ apps: AppItem[] }>;
}

const mockInstalledApps: AppItem[] = [
  { appName: "Instagram", packageName: "com.instagram.android" },
  { appName: "TikTok", packageName: "com.zhiliaoapp.musically" },
  { appName: "YouTube", packageName: "com.google.android.youtube" },
  { appName: "WhatsApp", packageName: "com.whatsapp" },
  { appName: "X / Twitter", packageName: "com.twitter.android" },
  { appName: "Chrome", packageName: "com.android.chrome" },
  { appName: "Spotify", packageName: "com.spotify.music" },
  { appName: "Discord", packageName: "com.discord" },
  { appName: "Telegram", packageName: "org.telegram.messenger" },
  { appName: "Netflix", packageName: "com.netflix.mediaclient" },
  { appName: "Reddit", packageName: "com.reddit.frontpage" },
  { appName: "Snapchat", packageName: "com.snapchat.android" },
  { appName: "Gmail", packageName: "com.google.android.gm" },
  { appName: "Google Maps", packageName: "com.google.android.apps.maps" },
];

export const AtlasPhoneControl = registerPlugin<AtlasPhoneControlPluginInterface>("AtlasPhoneControl", {
  web: {
    checkPermissions: async () => ({
      usageAccessGranted: true,
      overlayGranted: true,
    }),
    requestUsageAccess: async () => {},
    requestOverlayPermission: async () => {},
    getTodayScreenTimeMinutes: async () => ({ minutes: 105 }),
    getInstalledApps: async () => ({ apps: mockInstalledApps }),
  },
});
