import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "./components/StatCard";
import { LeadsByStatus } from "./components/LeadsByStatus";
import { RecentLeads } from "./components/RecentLeads";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { DashboardComponentProps } from "./Dashboard.types";

export function DashboardComponent({
  leads,
  stats,
  isLoading,
}: DashboardComponentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

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
