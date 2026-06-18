import { LeadColumn } from "../../LeadsTable.constants";
import { SortState } from "../../LeadsTable.types";

export type LeadsTableHeaderProps = {
    sort: SortState;
    onSortChange: (column: LeadColumn) => void;
    visibleColumns: LeadColumn[];
  }