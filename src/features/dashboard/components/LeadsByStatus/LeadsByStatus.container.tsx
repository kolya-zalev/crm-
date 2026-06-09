import { LeadsByStatusComponent } from "./LeadsByStatus.component";
import { LeadsByStatusProps } from "./LeadsByStatus.types";

export function LeadsByStatusContainer({stats}: LeadsByStatusProps){
    return <LeadsByStatusComponent stats={stats} />
}