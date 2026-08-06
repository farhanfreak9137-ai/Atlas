import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";
import { Slider } from "@/components/ui/Slider";

export default function DashboardSettings({
  value,
  onChange,
}: {
  value: { layout: string; widgets: string[] | null; spacing: number };
  onChange: (newValue: Partial<{ layout: string; widgets: string[]; spacing: number }>) => void;
}) {
  const layouts = ["grid", "list", "compact"];
  const widgetOptions = [
    "tasks",
    "habits",
    "goals",
    "calendar",
    "aiInsights",
    "statistics",
  ];

  // Safeguard against null/undefined widgets array
  const safeWidgets = value.widgets || [];

  return (
    <section>
      <SectionHeader title="Dashboard" subtitle="Customize your dashboard layout" />
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Layout Style</p>
          <div className="mt-2 flex flex-col gap-1">
            {layouts.map((layout) => (
              <ToggleButton
                key={layout}
                selected={value.layout === layout}
                onClick={() => onChange({ layout })}
              >
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </ToggleButton>
            ))}
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Widgets</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {widgetOptions.map((widget) => (
              <ToggleButton
                key={widget}
                selected={safeWidgets.includes(widget)}
                onClick={() => {
                  const newWidgets = safeWidgets.includes(widget)
                    ? safeWidgets.filter((w) => w !== widget)
                    : [...safeWidgets, widget];
                  onChange({ widgets: newWidgets });
                }}
              >
                {widget.charAt(0).toUpperCase() + widget.slice(1)}
              </ToggleButton>
            ))}
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Widget Spacing</p>
          <Slider
            value={value.spacing || 4}
            min={1}
            max={10}
            onChange={(newValue) => {
              const safeValue = Math.max(1, Math.min(10, newValue));
              onChange({ spacing: safeValue });
            }}
          />
        </div>
      </div>
    </section>
  );
}