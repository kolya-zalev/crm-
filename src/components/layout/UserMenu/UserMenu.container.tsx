"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { UserMenuComponent } from "./UserMenu.component";
import { isDarkTheme } from "./utils/isDarkTheme";

export const UserMenuContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!session?.user) return null;

  return (
    <UserMenuComponent
      name={session.user.name ?? "User"}
      email={session.user.email ?? ""}
      userId={session.user.id}
      role={session.user.role}
      isDark={isDarkTheme(resolvedTheme, isMounted)}
      onDarkChange={(checked) => setTheme(checked ? "dark" : "light")}
      onSettings={() => router.push("/settings")}
      onProfile={() => router.push("/profile")}
      onLogout={() => signOut({ callbackUrl: "/login" })}
    />
  );
};
