import { Lead } from "@/types";

export interface LeadsTableRowProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
}
