import { LeadsByStatusComponent } from "./LeadsByStatus.component";
import { LeadsByStatusProps } from "./LeadsByStatus.types";

export const LeadsByStatusContainer = ({stats}: LeadsByStatusProps) => {
    return <LeadsByStatusComponent stats={stats} />
};