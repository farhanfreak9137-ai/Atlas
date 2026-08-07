"use client";

import { useDashboardStore } from "@/stores/dashboard.store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ThemeSettings from "@/components/settings/ThemeSettings";
import AIBehaviorSettings from "@/components/settings/AIBehaviorSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import NotificationsSettings from "@/components/settings/NotificationsSettings";
import DashboardSettings from "@/components/settings/DashboardSettings";
import KeyboardSettings from "@/components/settings/KeyboardSettings";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";

export default function SettingsPage() {
  const { settings, updateSettings } = useDashboardStore();

  return (
    <div className="space-y-10">

      <SectionHeader
        title="Settings"
        subtitle="Customize your Atlas experience — all changes are saved and applied instantly."
      />

      <ThemeSettings
        value={{
          scheme: settings.theme,
          accentColor: settings.accentColor,
          fontSize: settings.fontSize,
        }}
        onChange={(partial) => {
          updateSettings({
            theme: partial.scheme ?? settings.theme,
            accentColor: partial.accentColor ?? settings.accentColor,
            fontSize: partial.fontSize ?? settings.fontSize,
          });
        }}
      />

      <AIBehaviorSettings
        value={{
          verbosity: settings.aiVerbosity,
          creativeMode: settings.creativeMode,
          rememberHistory: settings.rememberHistory,
        }}
        onChange={(partial) => {
          updateSettings({
            aiVerbosity: partial.verbosity ?? settings.aiVerbosity,
            creativeMode: partial.creativeMode ?? settings.creativeMode,
            rememberHistory: partial.rememberHistory ?? settings.rememberHistory,
          });
        }}
      />

      <DashboardSettings
        value={{
          layout: settings.dashboardLayout,
          widgets: settings.activeWidgets,
        }}
        onChange={(partial) => {
          updateSettings({
            dashboardLayout: partial.layout ?? settings.dashboardLayout,
            activeWidgets: partial.widgets ?? settings.activeWidgets,
          });
        }}
      />

      <NotificationsSettings
        value={{ categories: settings.notificationCategories }}
        onChange={(partial) => {
          updateSettings({
            notificationCategories:
              partial.categories ?? settings.notificationCategories,
          });
        }}
      />

      <AccessibilitySettings
        value={{
          reducedMotion: settings.reducedMotion,
          contrast: settings.contrastMode,
        }}
        onChange={(partial) => {
          updateSettings({
            reducedMotion: partial.reducedMotion ?? settings.reducedMotion,
            contrastMode: partial.contrast ?? settings.contrastMode,
          });
        }}
      />

      <PrivacySettings
        value={{
          autoLockTime: settings.autoLockTime,
          dataRetention: settings.dataRetention,
        }}
        onChange={(partial) => {
          updateSettings({
            autoLockTime: partial.autoLockTime ?? settings.autoLockTime,
            dataRetention: partial.dataRetention ?? settings.dataRetention,
          });
        }}
      />

      <KeyboardSettings />

    </div>
  );
}