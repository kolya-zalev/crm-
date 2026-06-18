import { Lead } from "@/hooks/types";
import { StatusSortOrder } from "../LeadsTable.constants";
import { SortState } from "../LeadsTable.types";

const getSortableValue = (lead: Lead, column: NonNullable<SortState["column"]>) => {
  switch (column) {
    case "name":
      return lead.name ?? "";
    case "email":
      return lead.email ?? "";
    case "phone":
      return lead.phone ?? "";
    case "company":
      return lead.company ?? "";
    case "status":
      return StatusSortOrder.indexOf(lead.status);
    case "tags":
      return lead.tags?.join(", ") ?? "";
    case "actions":
      return "";
    default:
      return "";
  }
};

export const sortLeads = (leads: Lead[], sort: SortState): Lead[] => {
  const { column, direction } = sort;

  if (!column || column === "actions") {
    return leads;
  }

  const multiplier = direction === "asc" ? 1 : -1;

  return [...leads].sort((a, b) => {
    const aValue = getSortableValue(a, column);
    const bValue = getSortableValue(b, column);

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * multiplier;
    }

    return String(aValue).localeCompare(String(bValue)) * multiplier;
  });
};
