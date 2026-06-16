import { Badge } from "@/components/ui/badge";
import { Lead } from "@/hooks/types";
import { StatusBadgeStyle } from "./utils/LeadsStatusBadge.constants";

interface LeadsStatusBadgeProps {
  status: Lead["status"];
}

export const LeadsStatusBadge = ({ status }: LeadsStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={StatusBadgeStyle[status]}>
      {status}
    </Badge>
  );
};
