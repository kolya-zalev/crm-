import { LeadsTableState } from "../LeadsTable.types";

export type SavedViewState = Omit<LeadsTableState, "page"> 
export type SavedView = {
    id: string;
    name: string;
    isBuiltIn: boolean;
    state: SavedViewState;
}