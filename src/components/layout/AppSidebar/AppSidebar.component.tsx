"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  sidebarItems,
  sidebarGroups,
  isNavItemActive,
  filterByRole,
} from "@/config/navigation";
import { AppSidebarMenuItem } from "./AppSidebarMenuItem";
import { AppSidebarGroup } from "./AppSidebarGroup";

export const AppSidebarComponent = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const visibleItems = filterByRole(sidebarItems, userRole);
  const visibleGroups = sidebarGroups
    .map((group) => ({
      ...group,
      items: filterByRole(group.items, userRole),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
            C
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold">CRM</span>
            {session?.user.name ? (
              <span className="text-muted-foreground truncate text-xs">
                {session.user.name}
              </span>
            ) : null}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="gap-2">
          {visibleItems.map((item) => (
            <AppSidebarMenuItem
              key={item.id}
              item={item}
              isActive={isNavItemActive(pathname, item.href, item.exact)}
            />
          ))}
        </SidebarMenu>

        {visibleGroups.map((group) => (
          <AppSidebarGroup key={group.id} group={group} pathname={pathname} />
        ))}
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};
