import { SettingsState } from "@/stores/dashboard.store";

import ThemeSettings from "./ThemeSettings";
import AIBehaviorSettings from "./AIBehaviorSettings";
import PrivacySettings from "./PrivacySettings";
import NotificationsSettings from "./NotificationsSettings";
import DashboardSettings from "./DashboardSettings";
import KeyboardSettings from "./KeyboardSettings";
import AccessibilitySettings from "./AccessibilitySettings";

export default function SettingsLayout({ settings, onChange }: {
  settings: { settings: SettingsState };
  onChange: (partial: Partial<SettingsState>) => void;
}) {
  const s = settings.settings;

  return (
    <div className="space-y-10">
      <ThemeSettings
        value={{
          scheme: s.theme,
          accentColor: s.accentColor,
          fontSize: s.fontSize,
        }}
        onChange={(partial) => {
          onChange({
            theme: partial.scheme ?? s.theme,
            accentColor: partial.accentColor ?? s.accentColor,
            fontSize: partial.fontSize ?? s.fontSize,
          });
        }}
      />

      <AIBehaviorSettings
        value={{
          verbosity: s.aiVerbosity,
          creativeMode: s.creativeMode,
          rememberHistory: s.rememberHistory,
        }}
        onChange={(partial) => {
          onChange({
            aiVerbosity: partial.verbosity ?? s.aiVerbosity,
            creativeMode: partial.creativeMode ?? s.creativeMode,
            rememberHistory: partial.rememberHistory ?? s.rememberHistory,
          });
        }}
      />

      <DashboardSettings
        value={{
          layout: s.dashboardLayout,
          widgets: s.activeWidgets,
        }}
        onChange={(partial) => {
          onChange({
            dashboardLayout: partial.layout ?? s.dashboardLayout,
            activeWidgets: partial.widgets ?? s.activeWidgets,
          });
        }}
      />

      <NotificationsSettings
        value={{ categories: s.notificationCategories }}
        onChange={(partial) => {
          onChange({
            notificationCategories:
              partial.categories ?? s.notificationCategories,
          });
        }}
      />

      <AccessibilitySettings
        value={{
          reducedMotion: s.reducedMotion,
          contrast: s.contrastMode,
        }}
        onChange={(partial) => {
          onChange({
            reducedMotion: partial.reducedMotion ?? s.reducedMotion,
            contrastMode: partial.contrast ?? s.contrastMode,
          });
        }}
      />

      <PrivacySettings
        value={{
          autoLockTime: s.autoLockTime,
          dataRetention: s.dataRetention,
        }}
        onChange={(partial) => {
          onChange({
            autoLockTime: partial.autoLockTime ?? s.autoLockTime,
            dataRetention: partial.dataRetention ?? s.dataRetention,
          });
        }}
      />

      <KeyboardSettings />
    </div>
  );
}