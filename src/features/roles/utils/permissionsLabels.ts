import type { RoleInfo } from "@/types";

export type PermissionGroup =
  | "Leads"
  | "Team"
  | "Analytics"
  | "Notifications"
  | "Administration";

export type PermissionMeta = {
  code: string;
  label: string;
  group: PermissionGroup;
};

export const permissionGroups: PermissionGroup[] = [
  "Leads",
  "Team",
  "Analytics",
  "Notifications",
  "Administration",
];

export const permissionList: PermissionMeta[] = [
  { code: "lead:read", label: "View leads", group: "Leads" },
  { code: "lead:create", label: "Create leads", group: "Leads" },
  { code: "lead:update", label: "Edit leads", group: "Leads" },
  { code: "lead:update-status", label: "Change lead status", group: "Leads" },
  { code: "lead:take", label: "Take unassigned leads", group: "Leads" },
  { code: "lead:assign", label: "Assign leads to others", group: "Leads" },
  { code: "lead:unassign", label: "Unassign leads", group: "Leads" },
  { code: "lead:delete", label: "Delete leads", group: "Leads" },
  { code: "lead:be-assigned", label: "Can be assigned leads", group: "Leads" },
  {
    code: "user:list-assignable",
    label: "See assignable users",
    group: "Team",
  },
  { code: "team:read", label: "View team", group: "Team" },
  { code: "team:manage", label: "Invite and manage members", group: "Team" },
  { code: "analytics:view", label: "View analytics", group: "Analytics" },
  {
    code: "notification:lead-events",
    label: "Lead event notifications",
    group: "Notifications",
  },
  { code: "role:read", label: "View roles", group: "Administration" },
];

export const roleDescriptions: Record<RoleInfo["role"], string> = {
  admin: "Full access to every part of the CRM",
  manager: "Manages leads and the sales team",
  member: "Works with own and unassigned leads",
};
