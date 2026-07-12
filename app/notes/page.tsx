import { PageHeader } from "@/components/common/PageHeader";
import { NoteList } from "@/components/notes/NoteList";
import { PageContainer } from "@/components/ui/PageContainer";

export default function NotesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Atlas"
        title="Notes"
        description="Capture ideas, thoughts and everything worth remembering."
      />

      <NoteList />
    </PageContainer>
  );
}