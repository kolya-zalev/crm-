import { Lead } from "@/hooks/types";

export interface ArchiveComponentProps {
  lostLeads: Lead[];
  onReopen: (id: string) => Promise<void>;
}
