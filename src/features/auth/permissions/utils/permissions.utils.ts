import type { User } from "@/features/auth/auth.types";
import { RolePermissions, type Permission } from "../permissions.constants";

export const can = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  return RolePermissions[user.role]?.includes(permission) ?? false;
};
