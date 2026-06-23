import type { Lead } from "@/types";

export interface LeadContactInfoProps {
  lead: Pick<Lead, "email" | "phone" | "company">;
}
