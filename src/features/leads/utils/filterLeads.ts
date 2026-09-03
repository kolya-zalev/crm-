import { Lead } from "@/types";

export const filterLeads = (
  leads: Lead[],
  search: string,
  filter: string,
  currentUserId?: string,
): Lead[] => {
  const q = search.toLowerCase();

  return (leads ?? []).filter((lead) => {
    const matchesSearch =
      (lead.name?.toLowerCase()?.includes(q) ?? false) ||
      (lead.email?.toLowerCase()?.includes(q) ?? false) ||
      (lead.company?.toLowerCase()?.includes(q) ?? false);

    let matchesFilter = true;
    switch (filter) {
      case "my":
        matchesFilter = lead.assignedTo?.id === currentUserId;
        break;
      case "unassigned":
        matchesFilter = lead.assignedTo === null;
        break;
      case "all":
      case "":
        matchesFilter = true;
        break;

      default:
        matchesFilter = lead.status === filter;
        break;
    }

    return matchesSearch && matchesFilter;
  });
};
