"use client";

import { useLeads } from "../_features/leads/hooks/UseLeads";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "../_features/leads/components/Dashboard/StatCard";
import LeadsByStatus from "../_features/leads/components/Dashboard/LeadsByStatus";
import { RecentLeads } from "../_features/leads/components/Dashboard/RecentLeads";
import { WelcomeBanner } from "../_features/leads/components/Dashboard/WelcomeBanner";

export default function DashboardPage() {
  const { leads, isLoading } = useLeads();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  const stats: Record<string, number> = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <StatCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsByStatus stats={stats} />
        <RecentLeads leads={leads} />
      </div>

      <WelcomeBanner newLeadsCount={stats.new} />
    </div>
  );
}
