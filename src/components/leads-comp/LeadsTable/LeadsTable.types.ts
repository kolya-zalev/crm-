import { Lead } from "@/lib/types/lead";

export interface LeadsTableComponentProps {
  leads: Lead[];
  search: string;
  filter: string;
  isLoading: boolean;
  selectedLead: Lead | null
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onDelete: (id: string) => Promise<void>;
  onView: (id: string) => void;
  onCloseView:() => void
  onAddClick:() => void
 

}