import { LeadImportComponentProps } from "./LeadsImport.types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LeadsImportErrorsTableComponent } from "./components/LeadsImportErrorsTable/LeadsImportErrorsTable.component";
import { LeadsImportEmptyStateComponent } from "./components/LeadImportEmptyState/LeadsImportEmptyState.component";
import { LeadsImportSummaryComponent } from "./components/LeadsImportSummary/LeadsImportSummary.component";

export const LeadsImportComponent = ({
  open,
  fileName,
  isImporting,
  showEmptyState,
  showErrors,
  canImport,
  totalRows,
  validCount,
  errorCount,
  errors,
  importButton,
  onFileInputChange,
  onClose,
  onChooseFile,
  onImportConfirm,
  fileInput,
}: LeadImportComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Import Leads</DialogTitle>
        </DialogHeader>

        <input
          ref={fileInput}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={onFileInputChange}
        />

        {showEmptyState ? (
          <LeadsImportEmptyStateComponent onChooseFile={onChooseFile} />
        ) : (
          <div className="flex flex-col gap-4">
            <LeadsImportSummaryComponent
              fileName={fileName}
              totalRows={totalRows}
              validCount={validCount}
              errorCount={errorCount}
            />

            {showErrors && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-destructive">
                  Fix these errors
                </p>
                <div className="max-h-48 overflow-auto rounded-md border">
                  <LeadsImportErrorsTableComponent errors={errors} />
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="justify-center sm:justify-center">
          <Button
            className="bg-red-800 text-white rounded-xl cursor-pointer justify-center"
            type="button"
            onClick={onClose}
            disabled={isImporting}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer rounded-xl bg-blue-500 text-white justify-center"
            type="button"
            onClick={onImportConfirm}
            disabled={!canImport}
          >
            {isImporting ? <Spinner /> : importButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
