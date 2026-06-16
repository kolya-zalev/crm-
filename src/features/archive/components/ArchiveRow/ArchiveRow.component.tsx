import Link from "next/link";
import { GrView } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge/LeadsStatusBadge";
import { ArchiveRowProps } from "./ArchiveRow.types";
import { ReopenLeadDialog } from "../ReopenLeadDialog/ReopenLeadDialog.component";

export const ArchiveRow = ({ lead, onReopen }: ArchiveRowProps) => {
  const handleReopen = () => onReopen(lead.id);

  return (
    <TableRow className="transition-colors hover:bg-gray-50/50">
      <TableCell className="text-center font-medium text-gray-900">
        {lead.name}
      </TableCell>
      <TableCell className="text-center text-gray-600">{lead.email}</TableCell>
      <TableCell className="text-center text-gray-600">{lead.company}</TableCell>
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
          <ReopenLeadDialog leadName={lead.name} onReopen={handleReopen} />
        </div>
      </TableCell>
    </TableRow>
  );
};
