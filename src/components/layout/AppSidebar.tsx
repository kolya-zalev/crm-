"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems, isNavItemActive } from "@/config/navigation";
import { useSession } from "next-auth/react";
import { NotificationsPanel } from "@/features/notifications/components/NotificationsPanel";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const visibleItems = sidebarItems.filter(
    (item) => !item.roles || (userRole && item.roles.includes(userRole)),
  );
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
          <NotificationsPanel />
          
          {visibleItems.map((item) => {
            const active = isNavItemActive(pathname, item.href, item.exact);
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className="h-9 gap-2.5 rounded-md px-2.5 text-sm [&_svg]:size-5"
                >
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
