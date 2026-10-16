"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeSearch } from "./components/EmployeeSearch";
import { EmployeeSortHead } from "./components/EmployeeSortHead";
import { EmployeeTableRow } from "./components/EmployeeTableRow";
import { PeriodSelect } from "./components/PeriodSelect";
import type { EmployeeTableComponentProps } from "./EmployeeTable.types";

export const EmployeeTableComponent = ({
  data,
  rows,
  isLoading,
  isError,
  period,
  onPeriodChange,
  search,
  onSearchChange,
  sortKey,
  sortDirection,
  onSort,
  columnCount,
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
            : null}
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
              {isLoading ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columnCount}
                    className="py-10 text-center"
                  >
                    <Spinner className="mx-auto size-6" />
                  </TableCell>
                </TableRow>
              ) : isError || !data ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columnCount}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    Failed to load employees
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {rows.length === 0 ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={columnCount}
                        className="py-6 text-center text-sm text-muted-foreground"
                      >
                        {search.trim() ? "No matches" : "No employees yet"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <EmployeeTableRow key={row.userId} row={row} />
                    ))
                  )}
                  <EmployeeTableRow
                    key="unassigned"
                    row={data.unassigned}
                    isSummary
                    hidePeriodMetrics
                  />
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
