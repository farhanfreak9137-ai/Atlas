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
  return (
    <div className="p-8 space-y-8">
      <ThemeSettings
        value={{
          scheme: settings.settings.theme,
          primaryColor: 0,
          fontSize: settings.settings.fontSize
        }}
        onChange={(partial) => {
          onChange({
            theme: partial.scheme ?? settings.settings.theme,
            fontSize: partial.fontSize ?? settings.settings.fontSize
          });
        }}
      />

      <AIBehaviorSettings
        value={{
          verbosity: settings.settings.aiVerbosity,
          creativeMode: false, // placeholder
          rememberHistory: settings.settings.rememberHistory
        }}
        onChange={(partial) => {
          onChange({
            aiVerbosity: partial.verbosity,
            rememberHistory: partial.rememberHistory
          });
        }}
      />

      <PrivacySettings
        value={{
          autoLockTime: settings.settings.autoLockTime,
          encryption: true, // placeholder
          dataRetention: "week" // placeholder
        }}
        onChange={(partial) => {
          onChange({
            autoLockTime: partial.autoLockTime,
            // other privacy fields...
          });
        }}
      />

      <NotificationsSettings
        value={{
          enabled: settings.settings.notificationType,
          category: "tasks" // placeholder
        }}
        onChange={(partial) => {
          onChange({
            notificationType: partial.enabled,
          });
        }}
      />

      <DashboardSettings
        value={{
          layout: "grid", // placeholder
          widgets: settings.settings.activeWidgets,
          spacing: 4 // placeholder
        }}
        onChange={(partial) => {
          onChange({
            activeWidgets: partial.widgets,
          });
        }}
      />

      <KeyboardSettings
        value={{ shortcuts: {} }} // placeholder
        onChange={() => {
          // keyboard shortcuts saved elsewhere maybe
        }}
      />

      <AccessibilitySettings
        value={{
          fontSize: settings.settings.fontSize,
          contrast: settings.settings.contrastMode,
          reducedMotion: false,
          screenReader: false
        }}
        onChange={(partial) => {
          onChange({
            fontSize: partial.fontSize,
            contrastMode: partial.contrast,
          });
        }}
      />
    </div>
  );
}