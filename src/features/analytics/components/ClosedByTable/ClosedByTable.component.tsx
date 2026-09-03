"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClosedByTableProps } from "./ClosedByTable.types";
import { hasRows } from "./utils/hasRows";
export const ClosedByTableComponent = ({
  closedBy,
  closedBeforeTracking,
}: ClosedByTableProps) => {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Closed by</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {hasRows(closedBy) ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Won</TableHead>
                <TableHead>Lost</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closedBy.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.won}</TableCell>
                  <TableCell>{row.lost}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No closings recorded yet — attribution starts from the first status
            change.
          </p>
        )}

        {closedBeforeTracking > 0 && (
          <p className="text-sm text-muted-foreground">
            {closedBeforeTracking} closed leads have no author.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
