import { api } from "@/lib/api";
import { AuthResponse, LoginDto, RegisterDto, User } from "./auth.types";

const authApi = {
    login: async (data: LoginDto) => {
        const response = await api.post<AuthResponse>("/auth/login", data);
        return response.data;
    },
    register: async (data: RegisterDto) => {
        const response = await api.post<AuthResponse>("/auth/register", data);
        return response.data;
    },
    get: async () => {
        const response = await api.get<User>("/auth/me");
        return response.data;
    }
}

export default authApi;