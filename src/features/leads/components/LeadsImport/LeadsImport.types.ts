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
  validationResult: LeadImportValidationResult | null;
  isImporting: boolean;
  onFileSelect: (file: File) => void;
  onClose: () => void;
  onChooseFile: () => void;
  onImportConfirm: () => void;
  fileInput: React.RefObject<HTMLInputElement | null>;
};

export type LeadImportContainerProps = {
  open: boolean;
  onClose: () => void;
};
