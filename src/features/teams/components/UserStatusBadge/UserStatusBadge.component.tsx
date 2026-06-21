import { Badge } from "@/components/ui/badge";
import type { UserStatus } from "@/features/auth/auth.types";
import { UserStatusBadgeStyle } from "./UserStatusBadge.constants";

export const UserStatusBadge = ({ status }: { status: UserStatus }) => (
  <Badge variant="outline" className={UserStatusBadgeStyle[status]}>
    {status}
  </Badge>
);