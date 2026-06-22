"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { isNavItemActive, NavItem } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { SidebarNavProps } from "./SidebarNav.types";

export function SidebarNavComponent({ items }: SidebarNavProps) {
  const pathname = usePathname();

  const renderNavItem = useCallback(
    (item: NavItem) => {
      const active = isNavItemActive(pathname, item.href);
      const Icon = item.icon;

      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            asChild
            isActive={active}
            className={cn(
              "relative w-full h-11 justify-start gap-4 px-4 text-base font-medium rounded-xl text-white/80 transition-all duration-200 ease-in-out",
              "hover:bg-white/10 hover:text-white data-[active=true]:hover:bg-white/15 rounded-2xl hover:scale-110",
              active && [
                "bg-white/15 text-white font-semibold shadow-sm",
                "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-r-full before:bg-white before:animate-ping",
              ],
            )}
          >
            <Link
              href={item.href}
              className="flex items-center justify-center w-full gap-3"
            >
              <Icon
                className={cn(
                  "size-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  active ? "text-white" : "text-white/70",
                )}
              />
              {item.label}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    },
    [pathname],
  );

  return <SidebarMenu>{items.map(renderNavItem)}</SidebarMenu>;
}
