import { api } from "@/lib/api";

export type AssignableUser = {
  id: string;
  name: string;
  role: string;
};

export const usersApi = {
  getUsers: async () => {
    const response = await api.get<AssignableUser[]>("/api/users/assignable");
    return response.data;
  },
};
