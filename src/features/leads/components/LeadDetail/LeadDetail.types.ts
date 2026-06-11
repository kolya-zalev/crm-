import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";

export interface LeadDetailComponentProps {
  leadId: string;
  lead: Lead;
  currentStatusIndex: number;
  isEditOpen: boolean;
  onEditOpen: () => void;
  onEditClose: () => void;
  onStatusChange: (stepIndex: number) => Promise<void>;
  onUpdate: (id: string, data: LeadAddFormValues) => Promise<void>;
  onMarkAsLost: () => Promise<void>;
}
