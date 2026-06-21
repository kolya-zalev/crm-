import type { TeamMember, UpdateMemberDto } from "../../teams.types";

export type TeamMemberRowProps = {
  member: TeamMember;
  onUpdateMember: (id: string, data: UpdateMemberDto) => Promise<void>;
};
