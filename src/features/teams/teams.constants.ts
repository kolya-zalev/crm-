import type { Role } from "@/features/auth/auth.types";

export const TeamRoles: Role[] = ["admin", "manager", "sales", "viewer"];

export const TeamRoleLabels: Record<Role, string> = {
  admin: "Admin",
  manager: "Manager",
  sales: "Sales",
  viewer: "Viewer",
};
