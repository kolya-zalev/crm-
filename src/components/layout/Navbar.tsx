"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authRoutes } from "@/config/navigation";
import { useSession } from "next-auth/react";
import { UserMenu } from "./UserMenu";
export default function Navbar() {
  const { status } = useSession();
  return (
    <header className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2">
        {status === "loading" ? (
          <div className="h-8 w-24" />
        ) : status === "authenticated" ? (
          <>
            <UserMenu />
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href={authRoutes.login.href}>{authRoutes.login.label}</Link>
            </Button>
            <Button asChild>
              <Link href={authRoutes.signup.href}>
                {authRoutes.signup.label}
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
