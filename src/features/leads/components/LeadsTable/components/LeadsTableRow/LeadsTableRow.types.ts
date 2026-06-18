import { Lead } from "@/hooks/types";
import { LeadColumn } from "../../LeadsTable.constants";

export interface LeadsTableRowProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
  visibleColumns: LeadColumn[];
}
