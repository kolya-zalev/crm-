import type { LeadAddFormValues } from "@/validators";

export interface LeadAddFormProps {
  isNew: boolean;
  defaultValues: LeadAddFormValues;
  onSubmit: (data: LeadAddFormValues) => void;
  onReset: () => void;
}
