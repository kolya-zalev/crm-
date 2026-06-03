"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { brand } from "@/utils/utils";

export default function Navbar() {
  return (
    <header className="h-14 border-2 border-gray-400   flex items-center justify-between px-6">
      <NavigationMenu className="max-w-none ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={brand.href} className="text-gray-700 hover:scale-110  ">
                {brand.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      
    </header>
  );
}
