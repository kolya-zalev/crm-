"use client";

import { TeamTableProps } from "./TeamTable.types";
import { TeamMemberStatusBadge } from "../TeamMemberStatusBadge";
import { TeamMemberRoleBadge } from "../TeamMemberRoleBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamTableSkeleton } from "./components/TeamTableSkeleton/TeamTableSkeleton.component";

export const TeamTableComponent = ({
  members,
  isLoading,
  onDisable,
}: TeamTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
      <Table className="border-collapse text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TeamTableSkeleton />
          ) : members.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center font-medium text-gray-500"
              >
                No team members yet
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow
                key={member.id}
                className="transition-colors hover:bg-gray-50/50"
              >
                <TableCell className="font-medium">
                  {member.name.trim() || "—"}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <TeamMemberRoleBadge role={member.role} />
                </TableCell>
                <TableCell>
                  <TeamMemberStatusBadge status={member.status} />
                </TableCell>
                <TableCell className="text-center">
                  {member.status === "active" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDisable(member.id)}
                    >
                      Disable
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
