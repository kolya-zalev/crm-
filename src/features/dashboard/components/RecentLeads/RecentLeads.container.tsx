import { RecentLeadsProps } from "./RecentLeads.types";
import { RecentLeadsComponent } from "./RecentLeads.component";

const RecentLeadsLimit= 5;

export const RecentLeadsContainer = ({ leads }: RecentLeadsProps) => {
  return (
    <RecentLeadsComponent leads={leads.slice(0, RecentLeadsLimit)} />
  );
}