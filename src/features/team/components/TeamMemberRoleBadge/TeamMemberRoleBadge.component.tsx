import type { TeamMemberRoleProps } from "./TeamMemberRoleBadge.types";
import { TeamMemberRoleBadgeStyles } from "./TeamMemberRoleBadge.constants";
import { Badge } from "@/components/ui/badge";

export const TeamMemberRoleBadge = ({ role }: TeamMemberRoleProps) => {
  return (
    <Badge variant="outline" className={TeamMemberRoleBadgeStyles[role]}>
      {role}
    </Badge>
  );
};
