import { RecentLeadsProps } from "./RecentLeads.types";
import { ResentLeadsComponents } from "./RecentLeads.component";

export function ResentLeadsContainer({leads}: RecentLeadsProps){
    return <ResentLeadsComponents leads={leads} />
}