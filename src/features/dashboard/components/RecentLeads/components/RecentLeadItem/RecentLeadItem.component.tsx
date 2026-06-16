import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge/LeadsStatusBadge";
import { User } from "lucide-react";
import Link from "next/link";
import { RecentLeadItemProps } from "./RecentLeadItem.types";

export const RecentLeadItem = ({ lead }: RecentLeadItemProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex w-1/3 flex-col">
        <Link
          href={`/lead/${lead.id}`}
          className="flex items-center gap-2 hover:underline"
        >
          <User className="text-muted-foreground size-4 shrink-0" />
          <span className="text-sm font-medium">{lead.name}</span>
        </Link>
        <span className="text-muted-foreground pl-8 text-xs">{lead.email}</span>
      </div>
      <span className="w-1/3 text-center">{lead.company}</span>
      <LeadsStatusBadge status={lead.status} />
    </div>
  );
};
