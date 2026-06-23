import type { Lead } from "@/types";

export interface LeadDetailTitleProps {
  lead: Pick<Lead, "name" | "email" | "status">;
}
