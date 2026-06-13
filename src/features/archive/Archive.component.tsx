import Link from "next/link";
import { GrView } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import { ArchiveComponentProps } from "./Archive.types";


export function ArchiveComponent({
  lostLeads,
  onReopen,
}: ArchiveComponentProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-center text-2xl font-bold">Archive</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Lost Leads ({lostLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lostLeads.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No lost leads found
            </p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
              <Table className="border-collapse text-base">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Email
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Company
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Status
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-300 bg-white">
                  {lostLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <TableCell className="text-center font-medium text-gray-900">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {lead.email}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {lead.company}
                      </TableCell>
                      <TableCell className="text-center">
                        <LeadsStatusBadge status={lead.status} />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-row justify-center gap-1">
                          <Link href={`/lead/${lead.id}`}>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
                            >
                              <GrView size={16} />
                            </Button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer rounded-xl"
                              >
                                Reopen
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Reopen lead?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {lead.name} will be moved back to status new
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => void onReopen(lead.id)}
                                >
                                  Reopen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
