import { api } from "@/lib/api";

export type MeProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailChangedAt: string | null;
  nextEmailChangeAt: string | null;
};

export const profileApi = {
  getMe: async () => {
    const response = await api.get<MeProfile>("/api/users/me");
    return response.data;
  },
  updateMe: async (data: { name?: string; email?: string }) => {
    const response = await api.patch<MeProfile>("/api/users/me", data);
    return response.data;
  },
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await api.post("/api/users/me/password", data);
  },
};
