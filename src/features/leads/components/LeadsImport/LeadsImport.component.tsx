import { LeadImportComponentProps } from "./LeadsImport.types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

export const LeadsImportComponent = ({
  open,
  fileName,
  validationResult,
  isImporting,
  onFileSelect,
  onClose,
  onChooseFile,
  onImportConfirm,
  fileInput,
}: LeadImportComponentProps) => {
  const resultOfValidation = validationResult === null;
  const hasErrors = (validationResult?.errors.length ?? 0) > 0;
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="max-w-2xl" aria-describedby={undefined} >
        <DialogHeader>
          <DialogTitle>Import Leads</DialogTitle>
        </DialogHeader>

        <input
          ref={fileInput}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />

        {resultOfValidation ? (
          <div className="flex flex-col items-center gap-3 rounded-md border-2 border-dashed p-8 text-center">
            <Button
              type="button"
              onClick={onChooseFile}
              className="cursor-pointer rounded-xl bg-blue-500 text-white"
            >
              Choose CSV
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-md border p-4 text-sm">
              <p className="font-medium">{fileName}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-muted-foreground">
                <p>Total: {validationResult.totalRows}</p>
                <p>Valid: {validationResult.validRows.length}</p>
                <p>Errors: {validationResult.errors.length}</p>
              </div>
            </div>

            {hasErrors && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-destructive">
                  Fix these errors
                </p>
                <div className="max-h-48 overflow-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Row</TableHead>
                        <TableHead>Field</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {validationResult.errors.map((error, index) => (
                        <TableRow
                          key={`${error.row}-${error.field}-${error.message}-${index}`}
                        >
                          <TableCell>{error.row}</TableCell>
                          <TableCell>{error.field}</TableCell>
                          <TableCell>{error.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
            disabled={
              validationResult === null ||
              validationResult.errors.length > 0 ||
              isImporting
            }
          >
            {isImporting ? (
              <Spinner />
            ) : validationResult && validationResult.validRows.length > 0 ? (
              `Import ${validationResult.validRows.length} leads`
            ) : (
              "Import"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
