import { SavedView, SavedViewState } from "./savedViews.types";
import {
  DefaultVisibleColumns,
  DefaultPageSize,
} from "../LeadsTable.constants";

export const SavedViewsStorageKey = "crm-leads-saved-views";

export const DefaultSavedViewState: SavedViewState = {
  search: "",
  sort: { column: null, direction: "asc" },
  visibleColumns: [...DefaultVisibleColumns],
  statusFilter: "all",
  pageSize: DefaultPageSize,
};

export const BuiltInViews: SavedView[] = [
  {
    id: "all",
    name: "All Leads",
    isBuiltIn: true,
    state: { ...DefaultSavedViewState, statusFilter: "all" },
  },
  {
    id: "new",
    name: "New Leads",
    isBuiltIn: true,
    state: { ...DefaultSavedViewState, statusFilter: "new" },
  },

  {
    id: "qualified",
    name: "Qualified Leads",
    isBuiltIn: true,
    state: { ...DefaultSavedViewState, statusFilter: "qualified" },
  },

  {
    id: "lost",
    name: "Lost Leads",
    isBuiltIn: true,
    state: { ...DefaultSavedViewState, statusFilter: "lost" },
  },
];
