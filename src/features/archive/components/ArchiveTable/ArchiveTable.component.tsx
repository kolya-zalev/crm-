import { Lead } from "@/hooks/types";
import { Table, TableBody } from "@/components/ui/table";
import { ArchiveTableHeader } from "../ArchiveTableHeader/ArchiveTableHeader.component";
import { ArchiveRow } from "../ArchiveRow/ArchiveRow.component";

interface ArchiveTableProps {
  lostLeads: Lead[];
  onReopen: (leadId: string) => void | Promise<void>;
}

export const ArchiveTable = ({ lostLeads, onReopen }: ArchiveTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
      <Table className="border-collapse text-base">
        <ArchiveTableHeader />
        <TableBody className="divide-y divide-gray-300 bg-white">
          {lostLeads.map((lead) => (
            <ArchiveRow key={lead.id} lead={lead} onReopen={onReopen} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
