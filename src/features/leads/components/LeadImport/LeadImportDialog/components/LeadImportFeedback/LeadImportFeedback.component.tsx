import { LeadImportFeedbackProps } from "./LeadImportFeedback.types";

export const LeadImportFeedback = ({
  status,
  message,
  importedCount,
}: LeadImportFeedbackProps) => {
  if (status === "idle" || status === "preview") {
    if (status === "preview") {
      return (
        <p className="text-sm text-gray-600">
          Review errors before importing. Import is disabled while errors exist.
        </p>
      );
    }

    return null;
  }

  if (status === "importing") {
    return <p className="text-sm text-gray-600">Importing leads...</p>;
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
        Successfully imported {importedCount ?? 0} leads.
      </div>
    );
  }

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {message ?? "Import failed. Please try again."}
    </div>
  );
};
