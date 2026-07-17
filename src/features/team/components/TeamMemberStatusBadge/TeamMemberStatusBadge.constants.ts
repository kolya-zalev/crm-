import type { TeamMember } from "@/types";

export const TeamMemberStatusBadgeStyles: Record<TeamMember["status"], string> =
  {
    active:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    invited:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    disabled: "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
  };
