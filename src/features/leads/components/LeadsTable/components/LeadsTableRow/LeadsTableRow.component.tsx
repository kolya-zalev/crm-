"use client";

import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import { formatLeadTags } from "../../LeadsTable.utils";
import { LeadsTableRowProps } from "./LeadsTableRow.types";
import { LeadsTableRowActions } from "../LeadsTableRowActions/LeadsTableRowActions.component";

export const LeadsTableRow = ({
  lead,
  onEditClick,
  onDelete,
}: LeadsTableRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-gray-50/50">
      <TableCell className="text-center font-medium text-gray-900">
        <Link
          href={`/lead/${lead.id}`}
          className="hover:text-blue-600 hover:underline"
        >
          {lead.name}
        </Link>
      </TableCell>
      <TableCell className="text-center text-gray-600">{lead.email}</TableCell>
      <TableCell className="text-center text-gray-600">{lead.phone}</TableCell>
      <TableCell className="text-center text-gray-600">{lead.company}</TableCell>
      <TableCell className="text-center">
        <LeadsStatusBadge status={lead.status} />
      </TableCell>
      <TableCell className="text-center text-gray-600">
        {formatLeadTags(lead.tags)}
      </TableCell>
      <TableCell className="text-center">
        <LeadsTableRowActions
          lead={lead}
          onEditClick={onEditClick}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};
