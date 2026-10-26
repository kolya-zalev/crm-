import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { NumericCellProps } from "./NumericCell.types";

export const NumericCellComponent = ({
  children,
  className,
}: NumericCellProps) => (
  <TableCell className={cn("text-right tabular-nums", className)}>
    {children}
  </TableCell>
);
