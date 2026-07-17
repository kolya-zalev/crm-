"use client";

import { Button } from "@/components/ui/button";
import { TeamComponentProps } from "./Team.types";
import { TeamTable } from "./components/TeamTable";
import { InviteUserModal } from "./components/InviteUserModal";

export const TeamComponent = ({
  members,
  isLoading,
  isInviteOpen,
  isInviting,
  onInviteOpen,
  onInviteClose,
  onInvite,
  onDisable,
}: TeamComponentProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
        </div>
        <Button
          onClick={onInviteOpen}
          className="rounded-2xl px-6 py-3 bg-blue-400 hover:bg-blue-500 transition-colors duration-300"
          variant="default"
        >
          Invite user
        </Button>
      </div>

      <TeamTable
        members={members}
        isLoading={isLoading}
        onDisable={onDisable}
      />

      <InviteUserModal
        open={isInviteOpen}
        onClose={onInviteClose}
        onInvite={onInvite}
        isLoading={isInviting}
      />
    </div>
  );
};
