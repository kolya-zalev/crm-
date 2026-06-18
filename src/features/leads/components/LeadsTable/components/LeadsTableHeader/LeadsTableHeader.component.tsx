import {  TableHeader, TableRow } from "@/components/ui/table";
import { LeadsTableHeaderProps } from "./LeadsTableHeader.types";
import { LeadsTableSortableHead } from "./components/LeadsTableSortableHead/LeadsTableSortableHead.component";
import { LeadColumns } from "../../LeadsTable.constants";

export const LeadsTableHeader = ({
  sort,
  onSortChange,
  visibleColumns,
}: LeadsTableHeaderProps) => {
  return (
    <TableHeader className="bg-gray-100">
      <TableRow>
        {LeadColumns.filter((column) => visibleColumns.includes(column)).map((column) => (
          <LeadsTableSortableHead 
          key={column}
          column={column}
          sort={sort}
          onSortChange={onSortChange}
          />
        ))}
      </TableRow>
    </TableHeader>
  );
};
