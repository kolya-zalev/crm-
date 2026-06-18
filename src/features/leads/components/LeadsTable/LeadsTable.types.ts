import { Lead } from "@/hooks/types";
import { LeadColumn } from "./LeadsTable.constants";
import { SavedView } from "./SavedView/savedViews.types";

export type SortDirection = "asc" | "desc";

export type SortState = {
  column: LeadColumn | null;
  direction: SortDirection;
};

export interface LeadsTableState {
  search: string;
  statusFilter: "all" | Lead["status"];
  visibleColumns: LeadColumn[];
  pageSize: number;
  page: number;
  sort: SortState;
}

export interface LeadsTableComponentProps {
  leads: Lead[];
  search: string;
  filter: string;
  isLoading: boolean;
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  sort: SortState;
  visibleColumns: LeadColumn[];
  allViews: SavedView[];
  activeViewId: string | null;
  applyView: (id: string) => void;
  saveCurrentView: (name: string) => void;
  deleteView: (id: string) => void;
  onToggleColumn: (column: LeadColumn) => void;
  onSortChange: (column: LeadColumn) => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onDelete: (id: string) => Promise<void>;
  onAddClick: () => void;
  onEditClick: (lead: Lead) => void;
}
