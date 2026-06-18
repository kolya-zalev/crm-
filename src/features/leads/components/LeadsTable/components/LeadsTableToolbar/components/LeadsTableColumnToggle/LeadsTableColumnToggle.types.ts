import { LeadColumn } from "../../../../LeadsTable.constants";

export type LeadsTableColumnToggleProps = {
    visibleColumns: LeadColumn[];
    onToggleColumn: (column: LeadColumn) => void;
}