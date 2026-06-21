"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
import type { Role } from "@/features/auth/auth.types";
import { formatDateTime } from "@/utils/formatDate";
import { TeamRoleLabels } from "../../teams.constants";
import { DisableMemberDialog } from "../DisableMemberDialog/DisableMemberDialog.component";
import { TeamRoleSelect } from "../TeamRoleSelect/TeamRoleSelect.component";
import { UserStatusBadge } from "../UserStatusBadge/UserStatusBadge.component";
import type { TeamMemberRowProps } from "./TeamMemberRow.types";

export const TeamMemberRow = ({
  member,
  onUpdateMember,
}: TeamMemberRowProps) => {
  const { user } = useAuth();
  const canChangeRole = usePermission("team:change-role");
  const canDisable = usePermission("team:disable-user");
  const [isUpdating, setIsUpdating] = useState(false);

  const isSelf = user?.id === member.id;
  const showRoleSelect = canChangeRole && !isSelf;
  const showDisableAction =
    canDisable && !isSelf && member.status === "active";

  const handleRoleChange = async (role: Role) => {
    if (role === member.role) return;

    setIsUpdating(true);
    try {
      await onUpdateMember(member.id, { role });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDisable = async () => {
    setIsUpdating(true);
    try {
      await onUpdateMember(member.id, { status: "disabled" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-center font-medium">{member.name}</TableCell>
      <TableCell className="text-center">{member.email}</TableCell>
      <TableCell className="text-center">
        {showRoleSelect ? (
          <TeamRoleSelect
            value={member.role}
            onValueChange={(value) => void handleRoleChange(value)}
            disabled={isUpdating}
            triggerClassName="mx-auto w-36 rounded-xl"
          />
        ) : (
          TeamRoleLabels[member.role]
        )}
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center">
          <UserStatusBadge status={member.status} />
        </div>
      </TableCell>
      <TableCell className="text-center text-sm text-muted-foreground">
        {formatDateTime(member.createdAt)}
      </TableCell>
      <TableCell className="text-center">
        {showDisableAction ? (
          <DisableMemberDialog
            memberName={member.name}
            onDisable={handleDisable}
            disabled={isUpdating}
          />
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        )}
      </TableCell>
    </TableRow>
  );
};
