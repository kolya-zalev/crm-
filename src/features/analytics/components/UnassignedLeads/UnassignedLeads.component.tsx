"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import { UnassignedLeadsComponentProps } from "./UnassignedLeads.types";
import { useRouter } from "next/navigation";
import { isLeadStatus } from "./utils/UnassignedStatus";

export const UnassignedLeadsComponent = ({
  unassigned,
}: UnassignedLeadsComponentProps) => {
  const router = useRouter();
  const leads = unassigned.leads;

  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Unassigned leads - {leads.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[28%]">Lead name</TableHead>
                <TableHead className="w-[28%]">Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No unassigned leads
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/lead/${lead.id}`)}
                  >
                    <TableCell className="font-medium text-slate-900 hover:underline">
                      {lead.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.company || "—"}
                    </TableCell>
                    <TableCell>
                      {isLeadStatus(lead.status) ? (
                        <LeadsStatusBadge status={lead.status} />
                      ) : (
                        lead.status
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 text-amber-800"
                      >
                        Unassigned
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
