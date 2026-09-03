import { TeamMember } from "@/types/team.types";
import { api } from "@/lib/api";

const teamApi = {
  getMembers: async () => {
    const response = await api.get<TeamMember[]>("/api/team/members");
    return response.data;
  },
  inviteMember: async (email: string, role: "admin" | "manager" | "member") => {
    const body = { email, role };
    const response = await api.post<TeamMember>("/api/team/invite", body);
    return response.data;
  },
  updateMember: async (id: string, data: Partial<TeamMember>) => {
    const response = await api.patch<TeamMember>(
      `/api/team/members/${id}`,
      data,
    );
    return response.data;
  },
};

export default teamApi;
