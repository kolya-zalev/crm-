import { Lead } from "@/types";

export const isLeadStatus = (status: string): status is Lead["status"] =>
  status === "new" ||
  status === "contacted" ||
  status === "qualified" ||
  status === "won" ||
  status === "lost";
