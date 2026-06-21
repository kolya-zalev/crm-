import { api } from "@/lib/api";
import type { TeamMember, InviteUserDto, UpdateMemberDto } from "./teams.types";

const teamsApi = {
  getMembers: async () => {
    const response = await api.get<TeamMember[]>("/api/team/members");
    return response.data;
  },

  inviteUser: async (data: InviteUserDto) => {
    const response = await api.post<TeamMember>("/api/team/invite", data);
    return response.data;
  },

  updateMember: async (id: string, data: UpdateMemberDto) => {
    const response = await api.patch<TeamMember>(
      `/api/team/members/${id}`,
      data,
    );
    return response.data;
  },
};

export default teamsApi;
