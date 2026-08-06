import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { Slider } from "@/components/ui/Slider";

export default function AccessibilitySettings({
  value,
  onChange,
}: {
  value: {
    fontSize: "small" | "medium" | "large";
    contrast: "normal" | "high";
    reducedMotion: boolean;
    screenReader: boolean;
  };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  // Safe defaults in case value is partially undefined
  const safeFontSize = value.fontSize ?? "medium";
  const safeContrast = value.contrast ?? "normal";
  const safeReducedMotion = value.reducedMotion ?? false;
  const safeScreenReader = value.screenReader ?? false;

  return (
    <section>
      <SectionHeader title="Accessibility" subtitle="Make Atlas easier to use" />
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Text Size</p>
          <Slider
            value={safeFontSize === "small" ? 0 : safeFontSize === "medium" ? 1 : 2}
            min={0}
            max={2}
            onChange={(newValue) => {
              const map: ("small" | "medium" | "large")[] = ["small", "medium", "large"];
              onChange({ fontSize: map[newValue] });
            }}
          />
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Contrast Mode</p>
          <div className="mt-2 flex flex-col gap-1">
            <ToggleButton
              selected={safeContrast === "normal"}
              onClick={() => onChange({ contrast: "normal" })}
            >
              Normal
            </ToggleButton>
            <ToggleButton
              selected={safeContrast === "high"}
              onClick={() => onChange({ contrast: "high" })}
            >
              High Contrast
            </ToggleButton>
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Reduced Motion</p>
          <ToggleButton
            selected={safeReducedMotion}
            onClick={() => onChange({ reducedMotion: !safeReducedMotion })}
          />
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Screen Reader Support</p>
          <ToggleButton
            selected={safeScreenReader}
            onClick={() => onChange({ screenReader: !safeScreenReader })}
          />
        </div>
      </div>
    </section>
  );
}