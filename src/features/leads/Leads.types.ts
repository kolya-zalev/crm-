import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";
import { FormStatusType } from "./components/LeadAddModal";
import { SortState } from "./components/LeadsTable/LeadsTable.types";
import { LeadColumn } from "./components/LeadsTable/LeadsTable.constants";
import { SavedView } from "./components/LeadsTable/SavedView/savedViews.types";

export interface LeadsComponentProps {
  filteredLeads: Lead[];
  search: string;
  filter: string;
  isLoading: boolean;
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isModalOpen: boolean;
  formStatus: FormStatusType;
  editingLead: Lead | null;
  sort: SortState;
  allViews: SavedView[];
  activeViewId: string | null;
  applyView: (id: string) => void;
  saveCurrentView: (name: string) => void;
  deleteView: (id: string) => void;
  visibleColumns: LeadColumn[];
  onToggleColumn: (column: LeadColumn) => void;
  onSortChange: (column: LeadColumn) => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onDelete: (id: string) => Promise<void>;
  onAddClick: () => void;
  onEditClick: (lead: Lead) => void;
  onCloseModal: () => void;
  onCreate: (data: Omit<Lead, "id">) => Promise<void>;
  onUpdate: (id: string, data: LeadAddFormValues) => Promise<void>;
}
