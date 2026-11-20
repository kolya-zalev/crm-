import type { PermissionGroup } from "@/features/roles/utils/permissionsLabels";
import { RoleInfo } from "@/types";

export enum RolesStatus {
  Loading = "loading",
  Error = "error",
  Ready = "ready",
}

export type RolePermissionView = {
  code: string;
  label: string;
  isGranted: boolean;
};
export type RolePermissionGroupView = {
  group: PermissionGroup;
  permissions: RolePermissionView[];
};

export type RoleCardData = {
  role: RoleInfo["role"];
  description: string;
  grantedCount: number;
  totalCount: number;
  groups: RolePermissionGroupView[];
};

export type RolesComponentProps = {
  status: RolesStatus;
  cards: RoleCardData[];
};
