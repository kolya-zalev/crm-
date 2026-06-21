"use client";

import { Spinner } from "@/components/ui/spinner";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
import { useTeams } from "./hooks/useTeams";
import { TeamsComponent } from "./Teams.component";
import type { InviteUserDto, UpdateMemberDto } from "./teams.types";

export const TeamsContainer = () => {
  const canRead = usePermission("team:read");
  const { members, isLoading, inviteUser, updateMember } = useTeams();

  if (!canRead) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-muted-foreground">You don&apos;t have access to this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  const handleInvite = async (data: InviteUserDto) => {
    await inviteUser(data);
  };

  const handleUpdateMember = async (id: string, data: UpdateMemberDto) => {
    await updateMember({ id, data });
  };

  return (
    <TeamsComponent
      members={members}
      onInvite={handleInvite}
      onUpdateMember={handleUpdateMember}
    />
  );
};