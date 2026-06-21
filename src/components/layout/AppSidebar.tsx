"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/utils/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { can } from "@/features/auth/permissions/utils/permissions.utils";
import { SidebarNav } from "./SidebarNav";

export function AppSidebar() {
  const { user } = useAuth();
  const visibleItems = sidebarItems.filter((item) => {
    if (item.id === "teams") {
      return can(user, "team:read");
    }
    return true;
  });

  return (
    <Sidebar>
      <SidebarHeader className="items-center py-8">
        <Avatar className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
        </Avatar>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-4 ">
        <SidebarNav items={visibleItems} />
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
