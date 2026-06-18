import type { Dispatch, SetStateAction } from "react";
import type { LeadsTableState } from "../../LeadsTable.types";

export type UseLeadsSavedViewsParams = {
  tableState: LeadsTableState;
  setTableState: Dispatch<SetStateAction<LeadsTableState>>;
};
