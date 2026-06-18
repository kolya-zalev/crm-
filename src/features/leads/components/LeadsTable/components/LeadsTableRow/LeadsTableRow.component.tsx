"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge/LeadsStatusBadge";
import { formatTags } from "../../LeadsTable.utils";
import { LeadsTableRowProps } from "./LeadsTableRow.types";
import { LeadsTableRowActions } from "../LeadsTableRowActions/LeadsTableRowActions.component";

export const LeadsTableRow = ({
  lead,
  onEditClick,
  onDelete,
  visibleColumns,
}: LeadsTableRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-gray-50/50">
      {visibleColumns.map((column) => {
        switch (column) {
          case "name":
            return (
              <TableCell key={column} className="text-center font-medium text-gray-900">
                {lead.name}
              </TableCell>
            );
          case "email":
            return (
              <TableCell key={column} className="text-center text-gray-600">
                {lead.email}
              </TableCell>
            );
          case "phone":
            return (
              <TableCell key={column} className="text-center text-gray-600">
                {lead.phone}
              </TableCell>
            );
          case "company":
            return (
              <TableCell key={column} className="text-center text-gray-600">
                {lead.company}
              </TableCell>
            );
          case "status":
            return (
              <TableCell key={column} className="text-center">
                <LeadsStatusBadge status={lead.status} />
              </TableCell>
            );
          case "tags":
            return (
              <TableCell key={column} className="text-center text-gray-600">
                {formatTags(lead.tags)}
              </TableCell>
            );
          case "actions":
            return (
              <TableCell key={column} className="text-center">
                <LeadsTableRowActions
                  lead={lead}
                  onEditClick={onEditClick}
                  onDelete={onDelete}
                />
              </TableCell>
            );
          default:
            return null;
        }
      })}
    </TableRow>
  );
};
