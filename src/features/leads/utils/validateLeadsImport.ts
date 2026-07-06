import { schemaLeadImport } from "@/validators/leadImport";
import { mapCsvLead } from "./mapCsvLead";
import { LeadImportValidationResult } from "../components/LeadsImport/LeadsImport.types";

export const validateLeadsImport = (
  rows: Record<string, string>[],
): LeadImportValidationResult => {
  const validRows: LeadImportValidationResult["validRows"] = [];
  const errors: LeadImportValidationResult["errors"] = [];

  rows.map((raw, index) => {
    const rowNumber = index + 1;
    const mapped = mapCsvLead(raw);
    const result = schemaLeadImport.safeParse(mapped);

    if (result.success) {
      validRows.push(result.data);
    } else {
      result.error.issues.map((issue) => {
        errors.push({
          row: rowNumber,
          field: issue.path.join("."),
          message: issue.message,
        });
      });
    }
    return result;
  });

  return {
    validRows,
    errors,
    totalRows: rows.length,
  };
};
