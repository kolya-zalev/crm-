import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TeamMembersTableColumns } from "./TeamMembersTableHeader.constants";

export const TeamMembersTableHeader = () => {
  return (
    <TableHeader className="bg-gray-100">
      <TableRow>
        {TeamMembersTableColumns.map((column) => (
          <TableHead
            key={column.id}
            className="text-center font-semibold text-gray-700"
          >
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
