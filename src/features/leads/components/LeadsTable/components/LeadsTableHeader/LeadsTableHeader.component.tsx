import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const LeadsTableHeader = () => {
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
          Phone
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Company
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Status
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Tags
        </TableHead>
        <TableHead className="text-center font-semibold text-gray-700">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
