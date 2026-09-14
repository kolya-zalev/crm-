"use client";

import { useSession } from "next-auth/react";
import { useLeads } from "../../hooks/useLeads";
import { useAssignable } from "../../hooks/useAssignable";
import { LeadsSelectAssigneeComponent } from "./LeadsSelectAssignee.component";
import { LeadsSelectAssigneeContainerProps } from "./LeadsSelectAssignee.types";

export const LeadsSelectAssigneeContainer = ({
  leadId,
  assignedTo,
}: LeadsSelectAssigneeContainerProps) => {
  const { data: session } = useSession();
  const { users } = useAssignable();
  const { updateLead } = useLeads({ enabled: false });

  const role = session?.user?.role;
  const canUnassign = role === "admin";
  const canAssign = role === "admin" || role === "member";

  if (!canAssign) {
    return (
      <p className="text-sm">Assigned: {assignedTo?.name ?? "Unassigned"}</p>
    );
  }
  const handleChange = (value: string) => {
    if (value === "unassigned") {
      if (canUnassign) {
        updateLead(leadId, { assignedToId: null });
      }
      return;
    }
    updateLead(leadId, { assignedToId: value });
  };

  return (
    <LeadsSelectAssigneeComponent
      assigneeToId={assignedTo?.id ?? null}
      users={users}
      canUnassign={canUnassign}
      onChange={handleChange}
    />
  );
};
