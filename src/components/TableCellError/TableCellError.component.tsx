import { TableCell, TableRow } from "@/components/ui/table";
import type { TableCellErrorProps } from "./TableCellError.types";

export const TableCellErrorComponent = ({
  colSpan,
  message = "Failed to load data",
}: TableCellErrorProps) => (
  <TableRow className="hover:bg-transparent">
    <TableCell
      colSpan={colSpan}
      className="py-10 text-center text-sm text-muted-foreground"
    >
      {message}
    </TableCell>
  </TableRow>
);
