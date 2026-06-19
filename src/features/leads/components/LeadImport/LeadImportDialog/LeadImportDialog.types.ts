import { LeadAddFormValues } from "@/validators";

export type LeadImportDialogProps = {
  onImportLeads: (rows: LeadAddFormValues[]) => Promise<void>;
};
