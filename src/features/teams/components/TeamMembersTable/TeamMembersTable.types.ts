import type { TeamMember, UpdateMemberDto } from "../../teams.types";

export type TeamMembersTableProps = {
  members: TeamMember[];
  onUpdateMember: (id: string, data: UpdateMemberDto) => Promise<void>;
};
