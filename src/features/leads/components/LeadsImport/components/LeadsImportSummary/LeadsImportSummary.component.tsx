export const LeadsImportSummaryComponent = ({
  fileName,
  totalRows,
  validCount,
  errorCount,
}: {
  fileName: string | null;
  totalRows: number;
  validCount: number;
  errorCount: number;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border p-4 text-sm">
        <p className="font-medium">{fileName}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-muted-foreground">
          <p>Total: {totalRows}</p>
          <p>Valid: {validCount}</p>
          <p>Errors: {errorCount}</p>
        </div>
      </div>
    </div>
  );
};
