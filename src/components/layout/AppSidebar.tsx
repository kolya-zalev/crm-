"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems, isNavItemActive } from "@/utils/utils";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="items-center py-8">
        <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white text-3xl font-bold overflow-hidden"></div>
        <p className="mt-4 font-semibold text-lg text-white text-center">
          Name
        </p>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-4">
        <SidebarMenu>
          {sidebarItems.map((item) => {
            const active = isNavItemActive(pathname, item.href);

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={cn(
                    "text-white hover:bg-blue-300 gap-4 text-base py-8 rounded-xl",
                    active && "bg-blue-500 font-semibold ",
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
