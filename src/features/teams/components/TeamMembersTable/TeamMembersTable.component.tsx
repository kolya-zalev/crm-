import { Table, TableBody } from "@/components/ui/table";
import { TeamMemberRow } from "../TeamMemberRow/TeamMemberRow.component";
import { TeamMembersTableHeader } from "../TeamMembersTableHeader/TeamMembersTableHeader.component";
import type { TeamMembersTableProps } from "./TeamMembersTable.types";

export const TeamMembersTable = ({
  members,
  onUpdateMember,
}: TeamMembersTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
      <Table className="border-collapse text-base">
        <TeamMembersTableHeader />
        <TableBody className="divide-y divide-gray-300 bg-white">
          {members.map((member) => (
            <TeamMemberRow
              key={member.id}
              member={member}
              onUpdateMember={onUpdateMember}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
