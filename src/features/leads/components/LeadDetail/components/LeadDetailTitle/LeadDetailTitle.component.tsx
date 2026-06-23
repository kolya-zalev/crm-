import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import { LeadDetailTitleProps } from "./LeadDetailTitle.types";

export const LeadDetailTitle = ({ lead }: LeadDetailTitleProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{lead.name}</h1>
        <p className="text-sm text-muted-foreground">{lead.email}</p>
      </div>
      <LeadsStatusBadge status={lead.status} />
    </div>
  );
};
