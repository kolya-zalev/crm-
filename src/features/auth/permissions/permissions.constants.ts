import { Role } from "@/features/auth/auth.types";

export type Permission =
  | "leads:read"
  | "leads:view"
  | "leads:create"
  | "leads:edit"
  | "leads:delete"
  | "leads:import"
  | "leads:export";

export const RolePermissions: Record<Role, Permission[]> = {
    admin: [
        "leads:read",
        "leads:view",
        "leads:create",
        "leads:edit",
        "leads:delete",
        "leads:import",
        "leads:export",
    ],
    manager: [
        "leads:read",
        "leads:view",
        "leads:create",
        "leads:edit",
        "leads:delete",
        "leads:import",
        "leads:export",
    ],
    sales: [
        "leads:read",
        "leads:view",
        "leads:create",
        "leads:edit",
        "leads:import",
        "leads:export",
    ],
    viewer: [
        "leads:read",
        "leads:view",
    ],
}