import { api } from "@/lib/api";
import { SignupFormValues } from "@/validators";

type RegisterResponse = {
  id: string;
  email: string;
  name: string;
};

export const authApi = {
  register: async (data: SignupFormValues) => {
    const response = await api.post<RegisterResponse>("/auth/register", data);
    return response.data;
  },
};

