"use client";

import { NoteSection } from "@/features/leads/components/NotesSection";
import { ActivityTimeline } from "@/features/leads/components/ActivityTimeline";
import { TasksSection } from "@/features/leads/components/TasksSection";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";

interface LeadDetailSectionsProps {
  leadId: string;
}

export const LeadDetailSections = ({ leadId }: LeadDetailSectionsProps) => {
  const canRead = usePermission("leads:read");
  const canCreate = usePermission("leads:create");
  const canEdit = usePermission("leads:edit");
  const canDelete = usePermission("leads:delete");

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {canRead && (
          <NoteSection
            leadId={leadId}
            canCreate={canCreate}
            canDelete={canDelete}
          />
        )}
        <ActivityTimeline leadId={leadId} />
      </div>
      <div className="mt-6">
        {canRead && (
          <TasksSection
            leadId={leadId}
            canCreate={canCreate}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>
    </>
  );
};
