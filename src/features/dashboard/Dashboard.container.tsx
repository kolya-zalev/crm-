"use client";

import { useLeads } from "@/features/leads/hooks/useLeads";
import { calculateLeadStats } from "./utils/calculateLeadStats";
import { DashboardComponent } from "./Dashboard.component";

export function DashboardContainer() {
  const { leads, isLoading } = useLeads();
  const stats = calculateLeadStats(leads);

  return (
    <DashboardComponent leads={leads} stats={stats} isLoading={isLoading} />
  );
}
