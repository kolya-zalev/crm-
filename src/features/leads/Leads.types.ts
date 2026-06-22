import { Lead } from "@/hooks/types";
import { LeadAddFormValues } from "@/validators";
import { FormStatusType } from "./components/LeadAddModal";

export interface LeadsComponentProps {
  filteredLeads: Lead[];
  search: string;
  filter: string;
  isLoading: boolean;
  isModalOpen: boolean;
  formStatus: FormStatusType;
  editingLead: Lead | null;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onDelete: (id: string) => Promise<void>;
  onAddClick: () => void;
  onEditClick: (lead: Lead) => void;
  onCloseModal: () => void;
  onCreate: (data: Omit<Lead, "id">) => Promise<void>;
  onUpdate: (id: string, data: LeadAddFormValues) => Promise<void>;
}
