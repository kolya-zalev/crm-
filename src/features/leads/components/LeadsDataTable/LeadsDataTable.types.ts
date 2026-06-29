import { Lead } from "@/types";
import { ColumnDef, Row, Table } from "@tanstack/react-table";

export type GetLeadsDataTableColumnsParams = {
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
};

export type LeadsDataTableContainerProps = {
  data: Lead[];
  columns: ColumnDef<Lead>[];
};

export type HideableColumnOption = {
  id: string;
  isVisible: boolean;
};

export type LeadsDataTablePaginationProps = {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: readonly number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageSizeChange: (pageSize: number) => void;
};

export type LeadsDataTableComponentProps = {
  table: Table<Lead>;
  rows: Row<Lead>[];
  hideableColumns: HideableColumnOption[];
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void;
  isEmpty: boolean;
  visibleColumnsCount: number;
  pagination: LeadsDataTablePaginationProps;
};
