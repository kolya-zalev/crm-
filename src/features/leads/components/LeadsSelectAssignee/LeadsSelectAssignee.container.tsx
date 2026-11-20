"use client";

import { useSession } from "@/lib/auth-client";
import { useLeads } from "../../hooks/useLeads";
import { useAssignable } from "../../hooks/useAssignable";
import { LeadsSelectAssigneeComponent } from "./LeadsSelectAssignee.component";
import { LeadsSelectAssigneeContainerProps } from "./LeadsSelectAssignee.types";
import { canMutateLeads } from "../../utils/canMutate";
import { Button } from "@/components/ui/button";

export const LeadsSelectAssigneeContainer = ({
  leadId,
  assignedTo,
}: LeadsSelectAssigneeContainerProps) => {
  const { data: session } = useSession();
  const { users } = useAssignable();
  const { updateLead } = useLeads({ enabled: false });

  const role = session?.user?.role;
  const canUnassign = role === "admin";
  const canAssign = canMutateLeads(session?.user?.role);

  if (!canAssign) {
    if (role === "member" && assignedTo === null) {
      return (
        <Button
          onClick={() =>
            updateLead(leadId, { assignedToId: session?.user?.id })
          }
        >
          Take lead
        </Button>
      );
    }
    return (
      <p className="font-medium text-sm ">
        Assigned: {assignedTo?.name ?? "Unassigned"}
      </p>
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
