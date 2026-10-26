import { TableCell, TableRow } from "@/components/ui/table";
import type { TableCellEmptyProps } from "./TableCellEmpty.types";

export const TableCellEmptyComponent = ({
  colSpan,
  text,
}: TableCellEmptyProps) => (
  <TableRow className="hover:bg-transparent">
    <TableCell
      colSpan={colSpan}
      className="py-6 text-center text-sm text-muted-foreground"
    >
      {text}
    </TableCell>
  </TableRow>
);
