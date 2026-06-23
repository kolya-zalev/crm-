import { Card, CardContent } from "@/components/ui/card";
import { LeadAddModal, FormStatus } from "@/features/leads/components/LeadAddModal";
import { NoteSection } from "@/features/leads/components/NotesSection";
import { ActivityTimeline } from "@/features/leads/components/ActivityTimeline";
import { TasksSection } from "@/features/leads/components/TasksSection";
import { LeadDetailComponentProps } from "./LeadDetail.types";
import { LeadDetailHeader } from "./components/LeadDetailHeader/LeadDetailHeader.component";
import { LeadDetailTitle } from "./components/LeadDetailTitle/LeadDetailTitle.component";
import { LeadStatusStepper } from "./components/LeadStatusStepper/LeadStatusStepper.component";
import { LeadLostBanner } from "./components/LeadLostBanner/LeadLostBanner.component";
import { LeadContactInfo } from "./components/LeadContactInfo/LeadContactInfo.component";
import { LeadDetailsInfo } from "./components/LeadDetailsInfo/LeadDetailsInfo.component";

export function LeadDetailComponent({
  leadId,
  lead,
  currentStatusIndex,
  isEditOpen,
  onEditOpen,
  onEditClose,
  onUpdate,
}: LeadDetailComponentProps) {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="border shadow-sm">
        <LeadDetailHeader onEditOpen={onEditOpen} />

        <hr className="border-muted" />
        <CardContent className="flex flex-col gap-8 pt-6">
          <LeadDetailTitle lead={lead} />
          <LeadStatusStepper currentStatusIndex={currentStatusIndex} />
          {lead.status === "lost" && <LeadLostBanner />}

          <div className="grid grid-cols-1 gap-8 border-t pt-6 md:grid-cols-2">
            <LeadContactInfo lead={lead} />
            <LeadDetailsInfo lead={lead} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NoteSection leadId={leadId} />
        <ActivityTimeline leadId={leadId} />
      </div>
      <div className="mt-6">
        <TasksSection leadId={leadId} />
      </div>

      <LeadAddModal
        key={lead.id}
        open={isEditOpen}
        onClose={onEditClose}
        onSubmit={() => {}}
        onEdit={onUpdate}
        formStatus={FormStatus.EDIT}
        lead={lead}
      />
    </div>
  );
}
