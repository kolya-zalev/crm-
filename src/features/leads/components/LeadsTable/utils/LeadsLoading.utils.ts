import { Lead } from "@/types";

export const leadsLoading = (isLoading: boolean, leads: Lead[]) => isLoading ? "..." : leads.length;