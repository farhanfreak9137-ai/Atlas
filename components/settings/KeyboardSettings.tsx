import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

export default function KeyboardSettings({ value, onChange }: {
  value: { shortcuts: Record<string, boolean>; shortcut?: string };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  return (
    <section>
      <SectionHeader title="Keyboard Shortcuts" subtitle="Customize your key combinations" />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Add Shortcut</p>
          <div className="mt-2 flex flex-col gap-1">
            <input
              type="text"
              placeholder="e.g. Ctrl+C"
              value={value.shortcut || ""}
              onChange={(e) => onChange({ shortcut: e.target.value })}
              className="border rounded px-2 py-1"
            />
            <ToggleButton selected={!!value.shortcut} onClick={() => {
              if (value.shortcut) {
                onChange({ shortcut: value.shortcut.toUpperCase() });
              }
            }}>
              Set
            </ToggleButton>
          </div>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-sm font-medium text-accent">Common Shortcuts</p>
          <div className="mt-2 flex flex-col gap-1">
            <ToggleButton selected={!!value.shortcuts["Ctrl+Z"]} onClick={() => onChange({ shortcuts: { ...value.shortcuts, ["Ctrl+Z"]: !value.shortcuts["Ctrl+Z"] } })}>
              Undo
            </ToggleButton>
            <ToggleButton selected={!!value.shortcuts["Ctrl+Y"]} onClick={() => onChange({ shortcuts: { ...value.shortcuts, ["Ctrl+Y"]: !value.shortcuts["Ctrl+Y"] } })}>
              Redo
            </ToggleButton>
            <ToggleButton selected={!!value.shortcuts["Ctrl+F"]} onClick={() => onChange({ shortcuts: { ...value.shortcuts, ["Ctrl+F"]: !value.shortcuts["Ctrl+F"] } })}>
              Find
            </ToggleButton>
          </div>
        </div>
      </div>
    </section>
  );
}