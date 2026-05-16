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
import { sidebarItems } from '@/app/config/routing'
export function AppSidebar() {
  

  return (
    <Sidebar>
      <SidebarHeader className="items-center py-8">
        <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white text-3xl font-bold">
          <img
            src="/favicon.ico"
            alt="avatar"
            className="w-full h-full object-cover " 
          />
        </div>
        <p className="mt-4 font-semibold text-lg text-white text-center">
          Name
        </p>
      </SidebarHeader>
      <SidebarContent className="px-4 mt-4">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton className="text-white hover:bg-blue-300 gap-4 text-base py-6">
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
