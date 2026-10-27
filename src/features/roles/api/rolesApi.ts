import { api } from "@/lib/api";
import type { RoleInfo } from "@/types";

const rolesApi = {
  getRoles: async () => {
    const response = await api.get<RoleInfo[]>("/api/roles");
    return response.data;
  },
};

export default rolesApi;
