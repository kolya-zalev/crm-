import { RecentLeadsProps } from "./RecentLeads.types";
import { ResentLeadsComponents } from "./RecentLeads.component";

const RecentLeadsLimit= 5;

export function ResentLeadsContainer({ leads }: RecentLeadsProps) {
  return (
    <ResentLeadsComponents leads={leads.slice(0, RecentLeadsLimit)} />
  );
}