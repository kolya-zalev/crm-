import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ArchiveTableHeader = () => {
  return (
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead className="text-center font-semibold text-gray-700">
          Name
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Email
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Company
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Status
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
