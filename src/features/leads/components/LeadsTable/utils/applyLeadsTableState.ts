import { Lead } from "@/hooks/types";
import { filterLeads } from "@/features/leads/utils/filterLeads";
import type { LeadsTableState } from "../LeadsTable.types";
import { paginateLeads, type PaginatedLeads } from "./paginateLeads";
import { sortLeads } from "./sortLeads";

export type LeadsTableResult = PaginatedLeads;

export const applyLeadsTableState = (
  leads: Lead[],
  state: LeadsTableState,
): LeadsTableResult => {
  const filtered = filterLeads(leads, state.search, state.statusFilter);
  const sorted = sortLeads(filtered, state.sort);
  return paginateLeads(sorted, state.page, state.pageSize);
};
