import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  LeadAddModal,
  FormStatus,
} from "@/features/leads/components/LeadAddModal";
import { LeadDetailComponentProps } from "./LeadDetail.types";
import { LeadDetailHeader } from "./components/LeadDetailHeader/LeadDetailHeader.component";
import { LeadDetailSummary } from "./components/LeadDetailSummary/LeadDetailSummary.component";
import { LeadStatusStepper } from "./components/LeadStatusStepper/LeadStatusStepper.component";
import { LeadLostBanner } from "./components/LeadLostBanner/LeadLostBanner.component";
import { LeadContactInfo } from "./components/LeadContactInfo/LeadContactInfo.component";
import { LeadDetailsInfo } from "./components/LeadDetailsInfo/LeadDetailsInfo.component";
import { LeadDetailSections } from "./components/LeadDetailSections/LeadDetailSections.component";

export const LeadDetailComponent = ({
  leadId,
  lead,
  currentStatusIndex,
  isEditOpen,
  onEditOpen,
  onEditClose,
  onUpdate,
  onStatusChange,
  onMarkAsLost,
}: LeadDetailComponentProps) => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <LeadDetailHeader onEditOpen={onEditOpen} />
        </CardHeader>

        <hr className="border-muted" />
        <CardContent className="flex flex-col gap-8 pt-6">
          <LeadDetailSummary lead={lead} />
          <LeadStatusStepper
            currentStatusIndex={currentStatusIndex}
            onStatusChange={onStatusChange}
          />
          <LeadLostBanner lead={lead} onMarkAsLost={onMarkAsLost} />

          <div className="grid grid-cols-1 gap-8 border-t pt-6 md:grid-cols-2">
            <LeadContactInfo lead={lead} />
            <LeadDetailsInfo lead={lead} />
          </div>
        </CardContent>
      </Card>

      <LeadDetailSections leadId={leadId} />

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
};
