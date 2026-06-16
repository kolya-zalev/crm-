import { NoteSection } from "@/features/leads/components/NotesSection";
import { ActivityTimeline } from "@/features/leads/components/ActivityTimeline";
import { TasksSection } from "@/features/leads/components/TasksSection";

interface LeadDetailSectionsProps {
  leadId: string;
}

export const LeadDetailSections = ({ leadId }: LeadDetailSectionsProps) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NoteSection leadId={leadId} />
        <ActivityTimeline leadId={leadId} />
      </div>
      <div className="mt-6">
        <TasksSection leadId={leadId} />
      </div>
    </>
  );
};
