import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentLeadsProps } from "./RecentLeads.types";
import Link from "next/link";
import { RecentLeadItem } from "./components/RecentLeadItem/RecentLeadItem.component";

export const RecentLeadsComponent = ({ leads }: RecentLeadsProps) => {
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
              <RecentLeadItem key={lead.id} lead={lead} />
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
};
