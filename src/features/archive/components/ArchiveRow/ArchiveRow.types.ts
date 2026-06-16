import { Lead } from "@/hooks/types";

export interface ArchiveRowProps {
  lead: Lead;
  onReopen: (leadId: string) => void | Promise<void>;
}
