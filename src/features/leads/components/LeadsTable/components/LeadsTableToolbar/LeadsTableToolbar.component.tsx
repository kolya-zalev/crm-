import { LeadsTableComponentProps } from "../../LeadsTable.types";
import { LeadsSearch } from "@/features/leads/components/LeadsSearch";
import { LeadsFilter } from "@/features/leads/components/LeadsFilter";
import { Button } from "@/components/ui/button";

type LeadsTableToolbarProps = Pick<
  LeadsTableComponentProps,
  "search" | "filter" | "isLoading" | "leads" | "onSearchChange" | "onFilterChange" | "onAddClick"
>;

export const LeadsTableToolbar = ({
  search,
  filter,
  isLoading,
  leads,
  onSearchChange,
  onFilterChange,
  onAddClick,
}: LeadsTableToolbarProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <LeadsSearch value={search} onChange={onSearchChange} />
      <LeadsFilter value={filter} onChange={onFilterChange} />
      <p className="ml-auto p-2 text-sm font-medium text-gray-600">
        Total Leads: {isLoading ? "..." : leads.length}
      </p>
      <Button
        className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
        onClick={onAddClick}
      >
        Add Lead
      </Button>
    </div>
  );
};
