import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";

export interface LeadDetailComponentProps {
  leadId: string;
  lead: Lead;
  currentStatusIndex: number;
  isEditOpen: boolean;
  onEditOpen: () => void;
  onEditClose: () => void;
  onUpdate: (id: string, data: LeadAddFormValues) => Promise<void>;
}
