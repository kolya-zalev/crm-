import { Lead } from "@/hooks/types";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge/LeadsStatusBadge";

interface LeadDetailSummaryProps {
  lead: Lead;
}

export const LeadDetailSummary = ({ lead }: LeadDetailSummaryProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{lead.name}</h1>
        <p className="text-muted-foreground text-sm">{lead.email}</p>
      </div>
      <LeadsStatusBadge status={lead.status} />
    </div>
  );
};
