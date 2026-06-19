import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window === "undefined") {
      return Promise.reject(err);
    }

    const status = err.response?.status;
    const isAuthPage =
      window.location.pathname === "/login" ||
      window.location.pathname === "/register";

    if (status === 401) {
      localStorage.removeItem("accessToken");
      if (!isAuthPage) {
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }

    if (status === 403) {
      toast.error(
        err.response?.data?.message || "You don't have permission for this action",
      );
      return Promise.reject(err);
    }

    if (status) {
      toast.error(err.response?.data?.message || "An error occurred");
    }

    return Promise.reject(err);
  },
);
