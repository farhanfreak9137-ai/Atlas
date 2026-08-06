import { SectionHeader } from "@/components/ui/SectionHeader";
import { Slider } from "@/components/ui/Slider";
import { ToggleButton } from "@/components/ui/ToggleButton";

export default function AIBehaviorSettings({ value, onChange }: {
  value: { verbosity: number; creativeMode: boolean; rememberHistory: boolean };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  return (
    <section>
      <SectionHeader title="AI Behavior" subtitle="Control how your AI assistant responds" />
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Response Verbosity</p>
          <Slider
            value={value.verbosity}
            min={1}
            max={5}
            onChange={(newValue) => onChange({ verbosity: newValue })}
          />
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Creative Mode</p>
          <div className="mt-2 flex flex-row items-center space-x-3">
            <ToggleButton selected={value.creativeMode} onClick={() => onChange({ creativeMode: !value.creativeMode })}>
              Off
            </ToggleButton>
            <ToggleButton selected={!value.creativeMode} onClick={() => onChange({ creativeMode: !value.creativeMode })}>
              On
            </ToggleButton>
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Remember History</p>
          <div className="mt-2 flex flex-row items-center space-x-3">
            <ToggleButton selected={value.rememberHistory} onClick={() => onChange({ rememberHistory: !value.rememberHistory })}>
              Yes
            </ToggleButton>
            <ToggleButton selected={!value.rememberHistory} onClick={() => onChange({ rememberHistory: !value.rememberHistory })}>
              No
            </ToggleButton>
          </div>
        </div>
      </div>
    </section>
  );
}