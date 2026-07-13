"use client";

import { use } from "react";
import { LeadDetail } from "@/features/leads/components/LeadDetail";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = use(params);
  return <LeadDetail leadId={leadId} />;
}
