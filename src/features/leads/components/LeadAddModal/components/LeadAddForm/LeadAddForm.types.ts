import { UseFormReturn } from "react-hook-form";
import { LeadAddFormValues } from "@/validators";

export interface LeadAddFormProps {
  form: UseFormReturn<LeadAddFormValues>;
  isNew: boolean;
  onSubmit: (data: LeadAddFormValues) => void;
  onReset: () => void;
}
