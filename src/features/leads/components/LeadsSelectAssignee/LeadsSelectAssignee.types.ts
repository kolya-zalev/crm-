import type { AssignableUser } from "../../api/usersApi";
import type { Lead } from "@/types";

export type LeadsSelectAssigneeComponentProps = {
  assigneeToId: string | null;
  users: AssignableUser[];
  canUnassign: boolean;
  onChange: (value: string) => void;
};

export type LeadsSelectAssigneeContainerProps = {
  leadId: string;
  assignedTo: Lead["assignedTo"];
};
