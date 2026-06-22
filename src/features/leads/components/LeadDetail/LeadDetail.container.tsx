"use client";

import { useState } from "react";
import { LeadAddFormValues } from "@/validators";
import { Spinner } from "@/components/ui/spinner";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { getCurrentStatusIndex } from "./utils/leadStatus";
import { LeadDetailComponent } from "./LeadDetail.component";

interface LeadDetailContainerProps {
  leadId: string;
}

export function LeadDetailContainer({ leadId }: LeadDetailContainerProps) {
  const { leads, isLoading, updateLead } = useLeads();
  const lead = leads.find((l) => l.id === leadId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpdate = async (id: string, data: LeadAddFormValues) => {
    await updateLead(id, data);
    setIsEditOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <LeadDetailComponent
      leadId={leadId}
      lead={lead}
      currentStatusIndex={getCurrentStatusIndex(lead.status)}
      isEditOpen={isEditOpen}
      onEditOpen={() => setIsEditOpen(true)}
      onEditClose={() => setIsEditOpen(false)}
      onUpdate={handleUpdate}
    />
  );
}
