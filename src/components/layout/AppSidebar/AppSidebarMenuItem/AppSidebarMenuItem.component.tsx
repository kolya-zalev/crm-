import type { AppSidebarMenuItemProps } from "./AppSidebarMenuItem.types";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export const AppSidebarMenuItemComponent = ({
  item,
  isActive,
}: AppSidebarMenuItemProps) => {
  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="h-9 gap-2.5 rounded-md px-2.5 text-sm [&_svg]:size-5"
      >
        <Link href={item.href}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
