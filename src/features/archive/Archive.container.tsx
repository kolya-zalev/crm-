"use client";
import { Spinner } from "@/components/ui/spinner";
import { useLeads } from "../leads/hooks/useLeads";
import { ArchiveComponent } from "./Archive.component";
import { filterLostLeads } from "./utils/filterLostLeads";

export function ArchiveContainer() {
  const { leads, isLoading, updateLead } = useLeads();

  const lostLeads = filterLostLeads(leads);

  const handleReopen = async (id: string) => {
    await updateLead(id, { status: "new" });
  };
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return <ArchiveComponent lostLeads={lostLeads} onReopen={handleReopen} />;
}
