import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { Slider } from "@/components/ui/Slider";

export default function PrivacySettings({ value, onChange }: {
  value: { autoLockTime: number; encryption: boolean; dataRetention: "session" | "week" | "month" | "forever" };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  return (
    <section>
      <SectionHeader title="Privacy & Security" subtitle="Control data privacy and security settings" />
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Encryption</p>
          <div className="mt-2 flex flex-row items-center space-x-3">
            <ToggleButton selected={value.encryption} onClick={() => onChange({ encryption: !value.encryption })}>
              Enabled
            </ToggleButton>
            <ToggleButton selected={!value.encryption} onClick={() => onChange({ encryption: !value.encryption })}>
              Disabled
            </ToggleButton>
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Auto-Lock Timeout (minutes)</p>
          <Slider
            value={value.autoLockTime}
            min={1}
            max={30}
            onChange={(newValue) => onChange({ autoLockTime: newValue })}
          />
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Data Retention</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <ToggleButton selected={value.dataRetention === "session"} onClick={() => onChange({ dataRetention: "session" })}>
              Session Only
            </ToggleButton>
            <ToggleButton selected={value.dataRetention === "week"} onClick={() => onChange({ dataRetention: "week" })}>
              Week
            </ToggleButton>
            <ToggleButton selected={value.dataRetention === "month"} onClick={() => onChange({ dataRetention: "month" })}>
              Month
            </ToggleButton>
            <ToggleButton selected={value.dataRetention === "forever"} onClick={() => onChange({ dataRetention: "forever" })}>
              Forever
            </ToggleButton>
          </div>
        </div>
      </div>
    </section>
  );
}