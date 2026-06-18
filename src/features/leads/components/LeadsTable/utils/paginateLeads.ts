import { Lead } from "@/hooks/types";

export type PaginatedLeads = {
  rows: Lead[];
  total: number;
  pageCount: number;
};

export const paginateLeads = (
  leads: Lead[],
  page: number,
  pageSize: number,
): PaginatedLeads => {
  const total = leads.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    rows: leads.slice(start, start + pageSize),
    total,
    pageCount,
  };
};
