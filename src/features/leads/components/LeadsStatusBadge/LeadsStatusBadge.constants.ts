import type { Lead } from "@/types";

export const LeadStatusStyles: Record<Lead["status"], string> = {
  new: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  contacted: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  qualified:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  won: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  lost: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};
