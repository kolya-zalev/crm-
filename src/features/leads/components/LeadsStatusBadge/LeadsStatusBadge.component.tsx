import { Badge } from "@/components/ui/badge";
import { LeadStatusStyles } from "./utils/LeadsStatusStyles";
import { LeadsStatusBadgeProps } from "./LeadsStatusBadge.types";

export const LeadsStatusBadge = ({ status }: LeadsStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={LeadStatusStyles[status]}>
      {status}
    </Badge>
  );
};
