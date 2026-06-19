"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import authApi from "@/features/auth/authApi";
import { AuthContext } from "@/features/auth/auth.context";
import type { LoginDto, RegisterDto, User } from "@/features/auth/auth.types";

const ACCESS_TOKEN_KEY = "accessToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await authApi.get();
        setUser(profile);
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void initAuth();
  }, []);

  const login = useCallback(async (dto: LoginDto) => {
    const { accessToken, user: authenticatedUser } = await authApi.login(dto);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setUser(authenticatedUser);
  }, []);

  const register = useCallback(async (dto: RegisterDto) => {
    const { accessToken, user: authenticatedUser } = await authApi.register(dto);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setUser(authenticatedUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
