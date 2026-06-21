"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
import { InviteUserForm } from "./components/InviteUserForm/InviteUserForm.component";
import type { InviteUserDialogProps } from "./InviteUserDialog.types";

export const InviteUserDialog = ({ onInvite }: InviteUserDialogProps) => {
  const canInvite = usePermission("team:invite");
  const [open, setOpen] = useState(false);

  if (!canInvite) {
    return null;
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const handleInvite = async (data: Parameters<typeof onInvite>[0]) => {
    await onInvite(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Invite member</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
        </DialogHeader>

        <InviteUserForm
          onSubmit={handleInvite}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
