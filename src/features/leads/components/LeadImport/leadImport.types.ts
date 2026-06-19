import { LeadImportColumns } from "./leadImport.constants";
import { LeadAddFormValues } from "@/validators";

export type LeadImportRow = {
  rowNumber: number;
  data: LeadAddFormValues;
};
export type LeadImportColumn = (typeof LeadImportColumns)[number];
export type LeadImportRawRow = Record<LeadImportColumn, string>;

export type LeadImportRowError = {
  rowNumber: number;
  field?: string;
  message: string;
};

export type LeadImportFileError = {
  message: string;
};

export type LeadImportParseResult =
  | { rows: LeadImportRawRow[]; fileError?: undefined }
  | { rows?: undefined; fileError: LeadImportFileError };
export type LeadImportValidationResult = {
  validRows: LeadImportRow[];
  errors: LeadImportRowError[];
  totalRows: number;
};

export type LeadImportStatus =
  | "idle"
  | "preview"
  | "importing"
  | "error"
  | "success";
