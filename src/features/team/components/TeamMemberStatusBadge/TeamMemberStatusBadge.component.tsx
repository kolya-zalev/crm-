import type { TeamMemberStatusProps } from "./TeamMemberStatusBadge.types";
import { TeamMemberStatusBadgeStyles } from "./TeamMemberStatusBadge.constants";
import { Badge } from "@/components/ui/badge";

export const TeamMemberStatusBadge = ({ status }: TeamMemberStatusProps) => {
  return (
    <Badge variant="outline" className={TeamMemberStatusBadgeStyles[status]}>
      {status}
    </Badge>
  );
};
