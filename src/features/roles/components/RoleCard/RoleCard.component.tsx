import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TeamMemberRoleBadge } from "@/features/team/components/TeamMemberRoleBadge";
import { RolePermissionGroup } from "../RolePermissionGroup";
import type { RoleCardComponentProps } from "./RoleCard.types";

export const RoleCardComponent = ({ card }: RoleCardComponentProps) => (
  <Card>
    <CardHeader>
      <TeamMemberRoleBadge role={card.role} />
      <CardAction className="text-xs text-muted-foreground">
        {card.grantedCount} of {card.totalCount}
      </CardAction>
      <CardDescription>{card.description}</CardDescription>
    </CardHeader>
    <CardContent>
      {card.groups.map((group) => (
        <RolePermissionGroup key={group.group} group={group} />
      ))}
    </CardContent>
  </Card>
);
