import type { Role } from "@/features/auth/auth.types";

export type TeamRoleSelectProps = {
  value: Role;
  onValueChange: (role: Role) => void;
  disabled?: boolean;
  id?: string;
  triggerClassName?: string;
};
