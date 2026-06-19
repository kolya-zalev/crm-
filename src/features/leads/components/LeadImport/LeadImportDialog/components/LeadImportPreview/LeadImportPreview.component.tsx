import { LeadImportPreviewProps } from "./LeadImportPreview.types";

export const LeadImportPreview = ({
  validationResult,
}: LeadImportPreviewProps) => {
  if (!validationResult) {
    return null;
  }

  const { validRows, errors, totalRows } = validationResult;

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="space-y-1">
        <p className="font-medium">Import preview</p>
        <p>Total rows: {totalRows}</p>
        <p>Valid: {validRows.length}</p>
        <p>Errors: {errors.length}</p>
      </div>

      {errors.length > 0 && (
        <ul className="max-h-40 space-y-1 overflow-y-auto rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          {errors.map((error) => (
            <li
              key={`${error.rowNumber}-${error.field ?? "row"}-${error.message}`}
            >
              Row {error.rowNumber}
              {error.field ? ` — ${error.field}: ` : ": "}
              {error.message}
            </li>
          ))}
        </ul>
      )}

      {validRows.length > 0 && (
        <div className="max-h-40 overflow-y-auto rounded-md border border-gray-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Row</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Company</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {validRows.map((row) => (
                <tr key={row.rowNumber} className="border-t border-gray-200">
                  <td className="p-2">{row.rowNumber}</td>
                  <td className="p-2">{row.data.name}</td>
                  <td className="p-2">{row.data.email}</td>
                  <td className="p-2">{row.data.company}</td>
                  <td className="p-2">{row.data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
