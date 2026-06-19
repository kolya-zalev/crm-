import { LeadImportStatus } from "../../../leadImport.types";

export type LeadImportFeedbackProps = {
  status: LeadImportStatus;
  message?: string;
  importedCount?: number;
};
