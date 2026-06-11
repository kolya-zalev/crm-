import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import { RecentLeadsProps } from "./RecentLeads.types";
import { User } from "lucide-react";
import Link from "next/link";

export function ResentLeadsComponents({ leads }: RecentLeadsProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards shadow-sm shadow-red-200 transition-shadow duration-2000 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Recent Leads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y">
          {leads.length === 0 ? (
            <p>No leads yet</p>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex w-1/3 flex-col">
                  <Link
                    href={`/lead/${lead.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <User className="text-muted-foreground size-4 shrink-0" />
                    <span className="text-sm font-medium">{lead.name}</span>
                  </Link>
                  <span className="text-muted-foreground pl-8 text-xs">
                    {lead.email}
                  </span>
                </div>
                <span className="w-1/3 text-center">{lead.company}</span>
                <LeadsStatusBadge status={lead.status} />
              </div>
            
            ))
          )}
        </div>
        <div className="flex items-center justify-center">
          <Link href="/lead" className="text-sm text-blue-500 hover:underline">
            Want to see more leads?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
