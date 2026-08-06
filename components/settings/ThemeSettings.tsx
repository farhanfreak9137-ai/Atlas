import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { Slider } from "@/components/ui/Slider";

export default function ThemeSettings({ value, onChange }: {
  value: {
    scheme: "dark" | "light" | "auto";
    primaryColor: number;
    fontSize: "small" | "medium" | "large";
  };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  return (
    <section>
      <SectionHeader title="Theme" subtitle="Customize your visual appearance" />
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Color Scheme</p>
          <div className="mt-2 flex flex-row items-center space-x-3">
            <ToggleButton selected={value.scheme === "dark"} onClick={() => onChange({ scheme: "dark" })}>
              Dark
            </ToggleButton>
            <ToggleButton selected={value.scheme === "light"} onClick={() => onChange({ scheme: "light" })}>
              Light
            </ToggleButton>
            <ToggleButton selected={value.scheme === "auto"} onClick={() => onChange({ scheme: "auto" })}>
              Auto
            </ToggleButton>
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Primary Color</p>
          <div className="mt-2 flex flex-col">
            <Slider
              value={value.primaryColor}
              onChange={(newValue) => onChange({ primaryColor: newValue })}
            />
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Typography</p>
          <div className="mt-2 flex flex-col gap-2">
            <ToggleButton selected={value.fontSize === "small"} onClick={() => onChange({ fontSize: "small" })}>
              Small
            </ToggleButton>
            <ToggleButton selected={value.fontSize === "medium"} onClick={() => onChange({ fontSize: "medium" })}>
              Medium
            </ToggleButton>
            <ToggleButton selected={value.fontSize === "large"} onClick={() => onChange({ fontSize: "large" })}>
              Large
            </ToggleButton>
          </div>
        </div>
      </div>
    </section>
  );
}