import { Role, UserStatus } from "@/features/auth/auth.types";

export type TeamMember = {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
};

export type InviteUserDto = {
  email: string;
  name: string;
  role: Role;
};

export type UpdateMemberDto = {
  role?: Role;
  status?: UserStatus;
};

export type TeamsComponentProps = {
  members: TeamMember[];
  onInvite: (data: InviteUserDto) => Promise<void>;
  onUpdateMember: (id: string, data: UpdateMemberDto) => Promise<void>;
};
