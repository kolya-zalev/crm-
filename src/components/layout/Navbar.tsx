"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { brand, authRoutes } from "@/config/navigation";
import { useSession, signOut } from "next-auth/react";
import { IoMdExit } from "react-icons/io";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-gray-400 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <NavigationMenu className="max-w-none ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={brand.href}
                  className="text-gray-700 hover:scale-110  "
                >
                  {brand.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        {status === "loading" ? (
          <div className="h-8 w-24" />
        ) : status === "authenticated" ? (
          <>
            <span className="text-sm text-gray-700">
              {`Welcome, ${session.user.name} (${session.user.email})`}
            </span>
            <Button
              className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-red-100 hover:text-red-600"
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <IoMdExit size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild className="text-gray-700  ">
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
