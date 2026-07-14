import { LeadImport } from "@/validators/leadImport";

export type LeadImportRowError = {
  row: number;
  field: string;
  message: string;
};

export type LeadImportValidationResult = {
  validRows: LeadImport[];
  errors: LeadImportRowError[];
  totalRows: number;
};

export type LeadImportComponentProps = {
  open: boolean;
  fileName: string | null;
  isImporting: boolean;
  showEmptyState: boolean;
  showErrors: boolean;
  canImport: boolean;
  totalRows: number;
  validCount: number;
  errorCount: number;
  errors: LeadImportRowError[];
  importButton: string;
  onClose: () => void;
  onChooseFile: () => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImportConfirm: () => void;
  fileInput: React.RefObject<HTMLInputElement | null>;
};

export type LeadImportContainerProps = {
  open: boolean;
  onClose: () => void;
};
