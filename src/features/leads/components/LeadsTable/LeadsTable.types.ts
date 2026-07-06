import { Lead } from "@/types";

export interface LeadsTableComponentProps {
  leads: Lead[];
  search: string;
  filter: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onDelete: (id: string) => Promise<void>;
  onAddClick: () => void;
  onEditClick: (lead: Lead) => void;
  onImportClick: () => void;
}
