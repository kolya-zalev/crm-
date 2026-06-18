import type { LeadsTableState } from "./LeadsTable.types";

export const LeadColumns = [
  "name",
  "email",
  "phone",
  "company",
  "status",
  "tags",
  "actions",
] as const;
  
  export type LeadColumn = (typeof LeadColumns)[number];
  
  export const LeadColumnLabels: Record<LeadColumn, string> = {
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    status: "Status",
    tags: "Tags",
    actions: "Action",
  };
  
  export const DefaultVisibleColumns: LeadColumn[] = [
    "name", "email", "phone", "company", "status", "tags", "actions",
  ];
  
  export const PageSizeOptions = [10, 25, 50] as const;
  export const DefaultPageSize = 10;
  
  export const StatusSortOrder = [
    "new", "contacted", "qualified", "won", "lost",
  ] as const;
  
export const DefaultTableState: LeadsTableState = {
  search: "",
  statusFilter: "all",
  sort: { column: null, direction: "asc" },
  visibleColumns: DefaultVisibleColumns,
  page: 1,
  pageSize: DefaultPageSize,
};