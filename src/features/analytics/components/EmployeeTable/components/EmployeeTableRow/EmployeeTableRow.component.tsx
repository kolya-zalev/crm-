"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatDays, formatWinRate } from "../../utils/formatDays";
import type { EmployeeTableRowProps } from "./EmployeeTableRow.types";
export const EmployeeTableRowComponent = ({
  row,
  isSummary = false,
  hidePeriodMetrics = false,
}: EmployeeTableRowProps) => {
  return (
    <TableRow className={cn(isSummary && "bg-muted/40 hover:bg-muted/40")}>
      <TableCell
        className={cn("font-medium", isSummary && "text-muted-foreground")}
      >
        {row.userName}
      </TableCell>
      <TableCell className="text-right tabular-nums font-semibold">
        {row.open}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {row.byStage.new}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {row.byStage.contacted}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {row.byStage.qualified}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {row.overdue}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {row.created}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {hidePeriodMetrics ? "-" : row.won}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {hidePeriodMetrics ? "-" : row.lost}
      </TableCell>
      <TableCell className={cn("text-right tabular-nums")}>
        {hidePeriodMetrics ? "-" : formatWinRate(row.winRate)}
      </TableCell>
      <TableCell className="text-right tabular-nums">
        {hidePeriodMetrics ? (
          "-"
        ) : (
          <span className="inline-flex items-baseline justify-end gap-1">
            {row.wonSample > 0 ? (
              <span className="text-xs text-muted-foreground"></span>
            ) : null}
            {formatDays(row.medianTimeToWinDays)}
          </span>
        )}
      </TableCell>
      <TableCell className="text-right tabular-nums">
        {hidePeriodMetrics ? "-" : formatDays(row.avgTimeToWinDays)}
      </TableCell>
    </TableRow>
  );
};
