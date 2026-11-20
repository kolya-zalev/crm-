"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCellEmpty } from "@/components/TableCellEmpty";
import { TableCellLoading } from "@/components/TableCellLoading";
import { EmployeeTableRow } from "./components/EmployeeTableRow";
import { EmployeeSearch } from "./components/EmployeeSearch";
import { EmployeeSortHead } from "./components/EmployeeSortHead";
import { TableCellError } from "@/components/TableCellError";
import { PeriodSelect } from "./components/PeriodSelect";
import {
  TableStatus,
  type EmployeeTableComponentProps,
} from "./EmployeeTable.types";

export const EmployeeTableComponent = ({
  data,
  tableStatus,
  unassignedRow,
  emptyText,
  overdueText,
  period,
  onPeriodChange,
  search,
  onSearchChange,
  sortKey,
  sortDirection,
  columnCount,
  onSort,
  rows,
}: EmployeeTableComponentProps) => {
  const headProps = { activeKey: sortKey, direction: sortDirection, onSort };

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-lg font-medium">Employees</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <EmployeeSearch value={search} onChange={onSearchChange} />
            <PeriodSelect value={period} onChange={onPeriodChange} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Open, stages and Overdue are a current snapshot. Created, Won, Lost
          and time to win are events within the selected period.
          {data
            ? ` Overdue threshold: ${data.overdueThresholdDays} days.`
            : overdueText}
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border text-foreground">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <EmployeeSortHead
                  label="Employee"
                  sortKey="userName"
                  align="left"
                  {...headProps}
                />
                <EmployeeSortHead label="Open" sortKey="open" {...headProps} />
                <TableHead className="text-right">New</TableHead>
                <TableHead className="text-right">Contacted</TableHead>
                <TableHead className="text-right">Qualified</TableHead>
                <EmployeeSortHead
                  label="Overdue"
                  sortKey="overdue"
                  {...headProps}
                />
                <EmployeeSortHead
                  label="Created"
                  sortKey="created"
                  {...headProps}
                />
                <EmployeeSortHead label="Won" sortKey="won" {...headProps} />
                <EmployeeSortHead label="Lost" sortKey="lost" {...headProps} />
                <EmployeeSortHead
                  label="Win rate"
                  sortKey="winRate"
                  {...headProps}
                />
                <EmployeeSortHead
                  label="Median time to win"
                  sortKey="medianTimeToWinDays"
                  {...headProps}
                />
                <EmployeeSortHead
                  label="Avg time to win"
                  sortKey="avgTimeToWinDays"
                  {...headProps}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableStatus === TableStatus.Loading && (
                <TableCellLoading colSpan={columnCount} />
              )}
              {tableStatus === TableStatus.Error && (
                <TableCellError
                  colSpan={columnCount}
                  message="Failed to load employees"
                />
              )}
              {tableStatus === TableStatus.Empty && (
                <TableCellEmpty colSpan={columnCount} text={emptyText} />
              )}
              {rows.map((row) => (
                <EmployeeTableRow key={row.userId} row={row} />
              ))}
              {unassignedRow && (
                <EmployeeTableRow
                  row={unassignedRow}
                  isSummary
                  hidePeriodMetrics
                />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
