import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { ReminderList } from "@/components/reminders/ReminderList";

export default function RemindersPage() {
  return (
    <PageContainer>
        <PageHeader
            eyebrow="Atlas"
            title="Reminders"
            description="Never miss what matters."
        />

        <ReminderList />
    </PageContainer>
  );
}