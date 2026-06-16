import { Lead } from "@/hooks/types";

export interface LeadsTableRowActionsProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
}
