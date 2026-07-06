import { useRef, useState } from "react";
import { toast } from "sonner";
import { useLeads } from "../../hooks/useLeads";
import { parsedLeadsCsv } from "../../utils/parsedLeadsCsv";
import { validateLeadsImport } from "../../utils/validateLeadsImport";
import { LeadsImportComponent } from "./LeadsImport.component";
import {
  LeadImportContainerProps,
  LeadImportValidationResult,
} from "./LeadsImport.types";

export const LeadsImportContainer = ({
  open,
  onClose,
}: LeadImportContainerProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [validationResult, setValidationResult] =
    useState<LeadImportValidationResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createLead } = useLeads();

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast.error("Please select a file .csv");
      return;
    }
    try {
      const rows = await parsedLeadsCsv(file);
      const result = validateLeadsImport(rows);
      setFileName(file.name);
      setValidationResult(result);
    } catch (error) {
      toast.error("Failed to read CSV file");
    }
  };

  const handleImportConfirm = async () => {
    if (!validationResult) {
      return;
    }

    if (validationResult.errors.length > 0) {
      toast.error("Please fix the errors in the CSV");
      return;
    }

    if (validationResult.validRows.length === 0) {
      toast.error("No valid leads found in the CSV file");
      return;
    }

    try {
      setIsImporting(true);
      await Promise.all(
        validationResult.validRows.map((row) => createLead(row)),
      );
      toast.success(`Imported ${validationResult.validRows.length} leads`);
      handleCloseModal();
    } catch {
      toast.error("Failed to import leads");
    } finally {
      setIsImporting(false);
    }
  };

  const handleCloseModal = () => {
    setFileName(null);
    setValidationResult(null);
    setIsImporting(false);
    onClose();
  };

  return (
    <LeadsImportComponent
      open={open}
      fileName={fileName}
      validationResult={validationResult}
      isImporting={isImporting}
      onFileSelect={handleFileSelect}
      onClose={handleCloseModal}
      onChooseFile={handleChooseFile}
      onImportConfirm={handleImportConfirm}
      fileInput={fileInputRef}
    />
  );
};
