import { LeadsTableSortableHeadProps } from "./LeadsTableSortableHead.types";
import { TableHead } from "@/components/ui/table";
import { LeadColumnLabels } from "../../../../LeadsTable.constants";

export const LeadsTableSortableHead = ({
  column,
  sort,
  onSortChange,
}: LeadsTableSortableHeadProps) => {
  const label = LeadColumnLabels[column];
  const isActive = sort.column === column;
  const arrow = isActive ? (sort.direction === "asc" ? "↑" : "↓") : "";

  const handleClick = () => {
    onSortChange(column);
  };
  if (column === "actions") {
    return (
      <TableHead
        key={column}
        className="text-center font-semibold text-gray-700"
      >
        {label}
      </TableHead>
    );
  }
  return (
    <TableHead key={column} className="text-center font-semibold text-gray-700">
      <button type="button" onClick={handleClick} className="cursor-pointer">
        {label}
        {arrow}
      </button>
    </TableHead>
  );
};
