import { Lead } from "@/hooks/types";

export function filterLeads(
  leads: Lead[],
  search: string,
  filter: string,
): Lead[] {
  const q = search.toLowerCase();

  return (leads ?? []).filter((lead) => {
    const matchesSearch =
      (lead.name?.toLowerCase()?.includes(q) ?? false) ||
      (lead.email?.toLowerCase()?.includes(q) ?? false) ||
      (lead.company?.toLowerCase()?.includes(q) ?? false);

    const matchesFilter =
      filter === "all" || filter === "" ? true : lead.status === filter;

    return matchesSearch && matchesFilter;
  });
}
