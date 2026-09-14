"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamInviteSchema, type TeamInvite } from "@/validators";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { InviteUserModalProps } from "./InviteUserModal.types";
import { defaultValues } from "./utils/InviteModalValues/inviteModalValues";

export const InviteUserModalComponent = ({
  open,
  onClose,
  onInvite,
  isLoading = false,
}: InviteUserModalProps) => {
  const form = useForm<TeamInvite>({
    resolver: zodResolver(teamInviteSchema),
    defaultValues,
  });

  const handleSubmit = async (data: TeamInvite) => {
    await onInvite(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Invite user</DialogTitle>
          <DialogDescription className="text-center">
            Send an invitation by email and assign a role
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="invite-email" className="text-sm font-medium">
              Email
            </FieldLabel>
            <Input
              id="invite-email"
              type="email"
              placeholder="colleague@company.com"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            {form.formState.errors.email?.message && (
              <FieldDescription className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.role}>
            <FieldLabel htmlFor="invite-role" className="text-sm font-medium">
              Role
            </FieldLabel>
            <select
              id="invite-role"
              {...form.register("role")}
              className="w-full rounded-xl border border-input bg-transparent p-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 dark:bg-zinc-900"
              aria-invalid={!!form.formState.errors.role}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>
            {form.formState.errors.role?.message && (
              <FieldDescription className="text-sm text-red-500">
                {form.formState.errors.role.message}
              </FieldDescription>
            )}
          </Field>

          <DialogFooter className="w-full sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl px-6 py-3 bg-red-400 hover:bg-red-500 transition-colors duration-300"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-2xl px-6 py-3 bg-green-400 hover:bg-green-500 transition-colors duration-300"
            >
              {isLoading ? <Spinner className="size-4" /> : "Send invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
