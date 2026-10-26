import { Lead } from "@/types";

export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
] as const;

export const isLeadStatus = (status: string): status is Lead["status"] =>
  (leadStatuses as readonly string[]).includes(status);
