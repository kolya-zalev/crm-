import { Lead } from "@/types";
import { LeadStats } from "./utils/calculateLeadStats";

export interface DashboardComponentProps {
  leads: Lead[];
  stats: LeadStats;
  isLoading: boolean;
}
