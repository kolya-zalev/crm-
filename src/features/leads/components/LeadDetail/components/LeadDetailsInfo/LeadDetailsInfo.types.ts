import type { Lead } from "@/types";

export interface LeadDetailsInfoProps {
  lead: Pick<Lead, "notes" | "source" | "tags">;
}
