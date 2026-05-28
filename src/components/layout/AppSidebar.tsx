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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();

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
        <SidebarMenu>
          {sidebarItems.map((item) => {
            const active = isNavItemActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={cn(
                    "relative w-full h-11 justify-start gap-4 px-4 text-base font-medium rounded-xl text-white/80 transition-all duration-200 ease-in-out",
                    "hover:bg-white/10 hover:text-white data-[active=true]:hover:bg-white/15 rounded-2xl ",
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
          })}
        </SidebarMenu>

        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter >
        
      </SidebarFooter>
    </Sidebar>
  );
}
