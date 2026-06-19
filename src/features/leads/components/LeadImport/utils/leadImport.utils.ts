import {
  LeadImportColumns,
  LeadImportRequiredColumns,
  LeadImportTagsSeparator,
  MaxImportRows,
} from "../leadImport.constants";
import type {
  LeadImportColumn,
  LeadImportParseResult,
  LeadImportRawRow,
  LeadImportRow,
  LeadImportRowError,
  LeadImportValidationResult,
} from "../leadImport.types";
import {
  schemaLeadAdd,
  schemaLeadImportCsvRow,
  type LeadImportCsvRowFormValues,
} from "@/validators";
import type { ZodError } from "zod";

const normalizeLine = (line: string) => line.replace(/\r$/, "").trim();

const isEmptyRow = (row: LeadImportRawRow) =>
  LeadImportColumns.every((column) => row[column].trim() === "");

const buildRawRow = (
  cells: string[],
  headerIndex: Record<LeadImportColumn, number | undefined>,
): LeadImportRawRow => {
  const row = {} as LeadImportRawRow;

  for (const column of LeadImportColumns) {
    const index = headerIndex[column];
    row[column] = index === undefined ? "" : (cells[index] ?? "").trim();
  }

  return row;
};

export const parseCsv = (text: string): LeadImportParseResult => {
  const normalizedText = text.replace(/^\uFEFF/, "").trim();

  if (!normalizedText) {
    return { fileError: { message: "CSV file is empty" } };
  }

  const lines = normalizedText
    .split("\n")
    .map(normalizeLine)
    .filter((line) => line.length > 0);

  if (lines.length < 1) {
    return { fileError: { message: "CSV file is empty" } };
  }

  const headerCells = lines[0].split(",").map((cell) => cell.trim());
  const header = headerCells.map((cell) => cell.replace(/^\uFEFF/, ""));

  for (const column of LeadImportRequiredColumns) {
    if (!header.includes(column)) {
      return { fileError: { message: `Missing column: ${column}` } };
    }
  }

  const headerIndex = {} as Record<LeadImportColumn, number | undefined>;

  for (const column of LeadImportColumns) {
    const index = header.indexOf(column);
    headerIndex[column] = index === -1 ? undefined : index;
  }

  const dataLines = lines.slice(1);

  if (dataLines.length > MaxImportRows) {
    return {
      fileError: {
        message: `Too many rows (max ${MaxImportRows})`,
      },
    };
  }

  const rows: LeadImportRawRow[] = [];

  for (const line of dataLines) {
    const cells = line.split(",").map((cell) => cell.trim());
    const row = buildRawRow(cells, headerIndex);

    if (!isEmptyRow(row)) {
      rows.push(row);
    }
  }

  return { rows };
};

const normalizeRawRowForCsvValidation = (rawRow: LeadImportRawRow) => ({
  name: rawRow.name.trim(),
  email: rawRow.email.trim(),
  company: rawRow.company.trim(),
  status: rawRow.status.trim(),
  phone: rawRow.phone.trim() || undefined,
  tags: rawRow.tags.trim() || undefined,
  notes: rawRow.notes.trim() || undefined,
  source: rawRow.source.trim() || undefined,
});

const transformCsvRowToLead = (
  csvRow: LeadImportCsvRowFormValues,
) => ({
  name: csvRow.name,
  email: csvRow.email,
  company: csvRow.company,
  status: csvRow.status,
  phone: csvRow.phone,
  tags: csvRow.tags
    ? csvRow.tags
        .split(LeadImportTagsSeparator)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [],
  notes: csvRow.notes,
  source: csvRow.source,
});

const appendZodErrors = (
  errors: LeadImportRowError[],
  rowNumber: number,
  zodError: ZodError,
) => {
  for (const issue of zodError.issues) {
    errors.push({
      rowNumber,
      field: issue.path[0]?.toString(),
      message: issue.message,
    });
  }
};

export const validateImportRows = (
  rawRows: LeadImportRawRow[],
): LeadImportValidationResult => {
  const validRows: LeadImportRow[] = [];
  const errors: LeadImportRowError[] = [];

  rawRows.forEach((rawRow, index) => {
    const rowNumber = index + 2;
    const csvParseResult = schemaLeadImportCsvRow.safeParse(
      normalizeRawRowForCsvValidation(rawRow),
    );

    if (!csvParseResult.success) {
      appendZodErrors(errors, rowNumber, csvParseResult.error);
      return;
    }

    const leadParseResult = schemaLeadAdd.safeParse(
      transformCsvRowToLead(csvParseResult.data),
    );

    if (!leadParseResult.success) {
      appendZodErrors(errors, rowNumber, leadParseResult.error);
      return;
    }

    validRows.push({
      rowNumber,
      data: leadParseResult.data,
    });
  });

  return {
    validRows,
    errors,
    totalRows: rawRows.length,
  };
};