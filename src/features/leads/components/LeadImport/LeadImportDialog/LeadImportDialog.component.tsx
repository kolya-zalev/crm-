"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseCsv, validateImportRows } from "../utils/leadImport.utils";
import type {
  LeadImportFileError,
  LeadImportStatus,
  LeadImportValidationResult,
} from "../leadImport.types";
import { LeadImportDialogProps } from "./LeadImportDialog.types";
import { LeadImportPreview } from "./components/LeadImportPreview";
import { LeadImportFeedback } from "./components/LeadImportFeedback";

const resetImportState = () => ({
  status: "idle" as LeadImportStatus,
  validationResult: null as LeadImportValidationResult | null,
  fileError: null as LeadImportFileError | null,
  feedbackMessage: "",
  importedCount: 0,
});

export const LeadImportDialog = ({ onImportLeads }: LeadImportDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<LeadImportStatus>("idle");
  const [validationResult, setValidationResult] =
    useState<LeadImportValidationResult | null>(null);
  const [fileError, setFileError] = useState<LeadImportFileError | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [importedCount, setImportedCount] = useState(0);

  const hasValidationErrors = (validationResult?.errors.length ?? 0) > 0;
  const canImport =
    validationResult !== null &&
    validationResult.validRows.length > 0 &&
    !hasValidationErrors &&
    status !== "importing";

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      const reset = resetImportState();
      setStatus(reset.status);
      setValidationResult(reset.validationResult);
      setFileError(reset.fileError);
      setFeedbackMessage(reset.feedbackMessage);
      setImportedCount(reset.importedCount);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      const parsed = parseCsv(text);

      if (parsed.fileError) {
        setFileError(parsed.fileError);
        setValidationResult(null);
        setStatus("idle");
        return;
      }

      const result = validateImportRows(parsed.rows);
      setFileError(null);
      setValidationResult(result);
      setStatus("preview");
      setFeedbackMessage("");
      setImportedCount(0);
    };

    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!validationResult || !canImport) {
      return;
    }

    setStatus("importing");

    try {
      const rows = validationResult.validRows.map((row) => row.data);
      await onImportLeads(rows);
      setImportedCount(rows.length);
      setStatus("success");
      setFeedbackMessage("");
    } catch {
      setStatus("error");
      setFeedbackMessage("Import failed. Please try again.");
    }
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import leads from CSV</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="text-sm file:mr-3 file:rounded-md file:border file:border-gray-300 file:px-3 file:py-1"
          />

          {fileError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {fileError.message}
            </div>
          )}

          <LeadImportPreview validationResult={validationResult} />
          <LeadImportFeedback
            status={status}
            message={feedbackMessage}
            importedCount={importedCount}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {status === "success" ? "Close" : "Cancel"}
          </Button>
          <Button onClick={handleImport} disabled={!canImport}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
