"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { brand } from "@/utils/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex h-14 items-center justify-between border-2 border-gray-400 px-6">
      <NavigationMenu className="max-w-none">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={brand.href} className="text-gray-700 hover:scale-110">
                {brand.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">{user.name}</span>
            <span className="text-muted-foreground text-xs capitalize">
              {user.role}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
