import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

export default function NotificationsSettings({ value, onChange }: {
  value: { category: string; enabled: string };
  onChange: (newValue: Partial<typeof value>) => void;
}) {
  const categories = ["tasks", "habits", "goals", "reminders"];
  return (
    <section>
      <SectionHeader title="Notifications" subtitle="Control what alerts you receive" />
      <div className="flex flex-col gap-2 mt-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <ToggleButton
              selected={value.enabled === category}
              onClick={() => onChange({ enabled: category })}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </ToggleButton>
          </div>
        ))}
      </div>
    </section>
  );
}