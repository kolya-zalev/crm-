"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { UserMenuComponent } from "./UserMenu.component";
import { isDarkTheme } from "./utils/isDarkTheme";
import { AppRoute } from "@/config/routes";
export const UserMenuContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleNavigate = (route: AppRoute) => router.push(route);
  const handleDarkChange = (checked: boolean) =>
    setTheme(checked ? "dark" : "light");
  const handleLogout = () =>
    signOut({ fetchOptions: { onSuccess: () => router.push(AppRoute.Login) } });
  if (!session?.user) return null;

  return (
    <UserMenuComponent
      name={session.user.name ?? "User"}
      email={session.user.email ?? ""}
      userId={session.user.id}
      role={session.user.role}
      isDark={isDarkTheme(resolvedTheme, isMounted)}
      onDarkChange={handleDarkChange}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
};
