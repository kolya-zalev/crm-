import { TeamMember } from "@/types";

export const TeamMemberRoleBadgeStyles: Record<TeamMember["role"], string> = {
  admin: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  manager: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  member: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};
