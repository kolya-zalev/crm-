import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StuckLeadsProps } from "./StuckLeads.types";

export const StuckLeadsComponent = ({ stuck }: StuckLeadsProps) => {
  const hasLeads = stuck.leads.length > 0;

  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Stuck leads</CardTitle>
        <p className="text-sm text-muted-foreground">
          No status change for more than {stuck.thresholdDays} days
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-6 text-sm">
          <span>New: {stuck.byStatus.new}</span>
          <span>Contacted: {stuck.byStatus.contacted}</span>
          <span>Qualified: {stuck.byStatus.qualified}</span>
        </div>

        {hasLeads && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days stuck</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stuck.leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.daysStuck}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
