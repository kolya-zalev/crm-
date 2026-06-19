import axios from "axios";

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
        if(err.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem('accessToken');
        const isAuthPage =
          window.location.pathname === "/login" ||
          window.location.pathname === "/register";
        if (!isAuthPage) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );