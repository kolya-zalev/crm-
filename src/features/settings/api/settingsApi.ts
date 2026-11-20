import { api } from "@/lib/api";

export const settingsApi = {
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await api.post("/api/users/me/password", data);
  },
};
