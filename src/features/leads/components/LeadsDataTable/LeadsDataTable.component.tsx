"use client";

import { flexRender } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "../EmptyState/EmptyState";
import { LeadsDataTableComponentProps } from "./LeadsDataTable.types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LeadsDataTableComponent = ({
  table,
  rows,
  hideableColumns,
  onColumnVisibilityChange,
  isEmpty,
  visibleColumnsCount,
  pagination,
}: LeadsDataTableComponentProps) => {
  return (
    <div className="rounded-md border">
      <div className="flex justify-end p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-2xl"
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {hideableColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.isVisible}
                onCheckedChange={(value) =>
                  onColumnVisibilityChange(column.id, !!value)
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!isEmpty ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={visibleColumnsCount}
                className="h-24 text-center"
              >
                <EmptyState />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="grid grid-cols-3 items-center px-4 py-4">
        <div />
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={pagination.onPreviousPage}
            disabled={!pagination.canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-25 text-center text-sm font-medium">
            Page {pagination.currentPage} of {pagination.pageCount}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={pagination.onNextPage}
            disabled={!pagination.canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="flex justify-end">
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              pagination.onPageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pagination.pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
