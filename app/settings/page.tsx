"use client";

import { useDashboardStore } from "@/stores/dashboard.store";
import SettingsLayout from "@/components/settings/SettingsLayout";

export default function SettingsPage() {
  const { settings, updateSettings } = useDashboardStore();

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <SettingsLayout settings={{ settings }} onChange={updateSettings} />
    </main>
  );
}