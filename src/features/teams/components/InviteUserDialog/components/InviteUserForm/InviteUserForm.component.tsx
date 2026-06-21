"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role } from "@/features/auth/auth.types";
import { TeamRoleSelect } from "../../../TeamRoleSelect/TeamRoleSelect.component";
import { InviteUserFormDefaultValues } from "../../InviteUserDialog.constants";
import type { InviteUserFormProps } from "./InviteUserForm.types";

export const InviteUserForm = ({ onSubmit, onCancel }: InviteUserFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(InviteUserFormDefaultValues);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(form);
      setForm(InviteUserFormDefaultValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="invite-name">Name</Label>
        <Input
          id="invite-name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="invite-email">Email</Label>
        <Input
          id="invite-email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="jane@example.com"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="invite-role">Role</Label>
        <TeamRoleSelect
          id="invite-role"
          value={form.role}
          onValueChange={(value: Role) =>
            setForm((prev) => ({ ...prev, role: value }))
          }
          triggerClassName="w-full rounded-xl"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Inviting..." : "Send invite"}
        </Button>
      </DialogFooter>
    </form>
  );
};
