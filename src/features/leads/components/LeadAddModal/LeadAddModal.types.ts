import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";

export const FormStatus = {
  EDIT: "edit",
  NEW: "new",
} as const;

export type FormStatusType = (typeof FormStatus)[keyof typeof FormStatus];

export interface LeadAddModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Lead, "id">) => void;
  onEdit: (id: string, data: LeadAddFormValues) => void;
  formStatus: FormStatusType;
  lead?: Lead | null;
}
