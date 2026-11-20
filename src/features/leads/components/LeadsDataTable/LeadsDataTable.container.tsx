"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { LeadsDataTableComponent } from "./LeadsDataTable.component";
import { LeadsDataTableContainerProps } from "./LeadsDataTable.types";
import { LeadsDataTablePageSizeOptions } from "./LeadsDataTableColumns/utils/LeadsDataTable.constants";

export const LeadsDataTableContainer = ({
  data,
  columns,
}: LeadsDataTableContainerProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination, sorting, columnVisibility },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .map((column) => ({
      id: column.id,
      isVisible: column.getIsVisible(),
    }));

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    table.getColumn(columnId)?.toggleVisibility(visible);
  };

  const rows = table.getRowModel().rows;
  const isEmpty = !rows.length;
  const visibleColumnsCount = table.getVisibleLeafColumns().length;

  const handlePreviousPage = () => {
    table.previousPage();
  };

  const handleNextPage = () => {
    table.nextPage();
  };

  const handlePageSizeChange = (pageSize: number) => {
    table.setPageSize(pageSize);
  };

  return (
    <LeadsDataTableComponent
      table={table}
      rows={rows}
      hideableColumns={hideableColumns}
      onColumnVisibilityChange={handleColumnVisibilityChange}
      isEmpty={isEmpty}
      visibleColumnsCount={visibleColumnsCount}
      pagination={{
        currentPage: table.getState().pagination.pageIndex + 1,
        pageCount: table.getPageCount(),
        pageSize: table.getState().pagination.pageSize,
        pageSizeOptions: LeadsDataTablePageSizeOptions,
        canPreviousPage: table.getCanPreviousPage(),
        canNextPage: table.getCanNextPage(),
        onPreviousPage: handlePreviousPage,
        onNextPage: handleNextPage,
        onPageSizeChange: handlePageSizeChange,
      }}
    />
  );
};
