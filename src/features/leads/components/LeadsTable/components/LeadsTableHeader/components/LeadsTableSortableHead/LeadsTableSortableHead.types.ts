import { LeadColumn } from "../../../../LeadsTable.constants";
import { SortState } from "../../../../LeadsTable.types";

export type LeadsTableSortableHeadProps = {
  column: LeadColumn;
  sort: SortState;
  onSortChange: (column: LeadColumn) => void;
};
