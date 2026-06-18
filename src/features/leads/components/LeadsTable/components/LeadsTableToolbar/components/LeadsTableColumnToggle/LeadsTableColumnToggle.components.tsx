import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadColumn, LeadColumnLabels, LeadColumns } from "../../../../LeadsTable.constants";
import { LeadsTableColumnToggleProps } from "./LeadsTableColumnToggle.types";

type LeadsTableColumnToggleItemProps = {
  column: LeadColumn;
  visibleColumns: LeadColumn[];
  onToggleColumn: (column: LeadColumn) => void;
};

const LeadsTableColumnToggleItem = ({
  column,
  visibleColumns,
  onToggleColumn,
}: LeadsTableColumnToggleItemProps) => {
  const label = LeadColumnLabels[column];

  const handleToggle = () => {
    onToggleColumn(column);
  };

  const handleSelect = (event: Event) => {
    event.preventDefault();
  };

  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center gap-2"
      onSelect={handleSelect}
    >
      <Checkbox
        checked={visibleColumns.includes(column)}
        onCheckedChange={handleToggle}
      />
      <span className="text-sm font-medium">{label}</span>
    </DropdownMenuItem>
  );
};

export const LeadsTableColumnToggle = ({
  visibleColumns,
  onToggleColumn,
}: LeadsTableColumnToggleProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LeadColumns.filter((column) => column !== "actions").map((column) => (
          <LeadsTableColumnToggleItem
            key={column}
            column={column}
            visibleColumns={visibleColumns}
            onToggleColumn={onToggleColumn}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
