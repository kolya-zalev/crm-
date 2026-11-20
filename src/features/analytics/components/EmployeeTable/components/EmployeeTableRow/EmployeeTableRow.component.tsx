"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatDays, formatWinRate } from "../../utils/formatDays";
import { NumericCell } from "./components/NumericCell";
import { PeriodMetricCell } from "./components/PeriodMetricCell";
import type { EmployeeTableRowProps } from "./EmployeeTableRow.types";

export const EmployeeTableRowComponent = ({
  row,
  isSummary = false,
  hidePeriodMetrics = false,
}: EmployeeTableRowProps) => (
  <TableRow className={cn(isSummary && "bg-muted/40 hover:bg-muted/40")}>
    <TableCell
      className={cn("font-medium", isSummary && "text-muted-foreground")}
    >
      {row.userName}
    </TableCell>

    <NumericCell className="font-semibold">{row.open}</NumericCell>
    <NumericCell>{row.byStage.new}</NumericCell>
    <NumericCell>{row.byStage.contacted}</NumericCell>
    <NumericCell>{row.byStage.qualified}</NumericCell>
    <NumericCell>{row.overdue}</NumericCell>
    <NumericCell>{row.created}</NumericCell>

    <PeriodMetricCell isHidden={hidePeriodMetrics}>{row.won}</PeriodMetricCell>
    <PeriodMetricCell isHidden={hidePeriodMetrics}>{row.lost}</PeriodMetricCell>
    <PeriodMetricCell isHidden={hidePeriodMetrics}>
      {formatWinRate(row.winRate)}
    </PeriodMetricCell>
    <PeriodMetricCell isHidden={hidePeriodMetrics}>
      {formatDays(row.medianTimeToWinDays)}
    </PeriodMetricCell>
    <PeriodMetricCell isHidden={hidePeriodMetrics}>
      {formatDays(row.avgTimeToWinDays)}
    </PeriodMetricCell>
  </TableRow>
);
