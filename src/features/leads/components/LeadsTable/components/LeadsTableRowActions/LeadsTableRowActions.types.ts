import { Lead } from "@/types";

export interface LeadsTableRowActionsProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
}
