"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { TeamInvite } from "@/validators";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { TeamComponent } from "./Team.component";

export const TeamContainer = () => {
  const { members, isLoading, isInviting, inviteMember, updateMember } =
    useTeamMembers();
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleInvite = async (data: TeamInvite) => {
    try {
      await inviteMember(data.email, data.role);
      toast.success("Invite sent successfully");
      setIsInviteOpen(false);
    } catch {
      toast.error("Failed to invite user");
    }
  };

  const handleDisable = async (id: string) => {
    try {
      await updateMember(id, { status: "disabled" });
      toast.success("User disabled successfully");
    } catch {
      toast.error("Failed to disable user");
    }
  };

  return (
    <TeamComponent
      members={members}
      isLoading={isLoading}
      isInviteOpen={isInviteOpen}
      isInviting={isInviting}
      onInviteOpen={() => setIsInviteOpen(true)}
      onInviteClose={() => setIsInviteOpen(false)}
      onInvite={handleInvite}
      onDisable={handleDisable}
    />
  );
};
