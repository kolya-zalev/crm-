"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { can } from "../utils/permissions.utils";
import type { Permission } from "../permissions.constants";

export const usePermission = (permission: Permission): boolean => {
  const { user } = useAuth();
  return can(user, permission);
};
