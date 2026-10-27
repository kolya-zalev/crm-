import type { RoleInfo } from "@/types";
import type { RoleCardData } from "../Roles.types";
import {
  permissionGroups,
  permissionList,
  roleDescriptions,
} from "./permissionsLabels";

export const buildRoleCards = (roles: RoleInfo[]): RoleCardData[] =>
  roles.map(({ role, permissions }) => ({
    role,
    description: roleDescriptions[role],
    grantedCount: permissions.length,
    totalCount: permissionList.length,
    groups: permissionGroups.map((group) => ({
      group,
      permissions: permissionList
        .filter((permission) => permission.group === group)
        .map((permission) => ({
          code: permission.code,
          label: permission.label,
          isGranted: permissions.includes(permission.code),
        })),
    })),
  }));
