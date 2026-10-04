"use client";

import { useState } from "react";
import { LeadAddFormValues } from "@/validators";
import { Spinner } from "@/components/ui/spinner";
import { useLead } from "@/features/leads/hooks/useLead";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { getCurrentStatusIndex, LeadStatuses } from "./utils/leadStatus";
import { LeadDetailComponent } from "./LeadDetail.component";
import { canMutateLeads } from "@/features/leads/utils/canMutate";
import { useSession } from "next-auth/react";
interface LeadDetailContainerProps {
  leadId: string;
  canMutateLeads: boolean;
}

export function LeadDetailContainer({ leadId }: LeadDetailContainerProps) {
  const { lead, isLoading, isError } = useLead(leadId);
  const { updateLead } = useLeads({ enabled: false });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data: session } = useSession();
  const canMutateLead = canMutateLeads(session?.user?.role);
  const handleUpdate = async (id: string, data: LeadAddFormValues) => {
    await updateLead(id, data);
    setIsEditOpen(false);
  };

  const handleStatusStepChange = (step: number) => {
    const newStatus = LeadStatuses[step - 1];
    if (!canMutateLead) return null;
    if (newStatus === lead?.status) return;
    if (newStatus) {
      updateLead(leadId, { status: newStatus });
    }
  };

  const handleMarkAsLost = () => {
    if (!canMutateLead) return null;
    if (lead?.status === "lost") return;
    {
      updateLead(leadId, { status: "lost" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError || !lead) {
    return <div>Lead not found</div>;
  }

  return (
    <LeadDetailComponent
      leadId={leadId}
      lead={lead}
      onStatusStepChange={handleStatusStepChange}
      currentStatusIndex={getCurrentStatusIndex(lead.status)}
      isEditOpen={isEditOpen}
      onMarkAsLost={handleMarkAsLost}
      onEditOpen={() => setIsEditOpen(true)}
      onEditClose={() => setIsEditOpen(false)}
      onUpdate={handleUpdate}
      canMutateLeads={canMutateLead}
    />
  );
}
