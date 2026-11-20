import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { isNavItemActive } from "@/config/navigation";
import { AppSidebarMenuItem } from "../AppSidebarMenuItem";
import type { AppSidebarGroupProps } from "./AppSidebarGroup.types";

export const AppSidebarGroupComponent = ({
  group,
  pathname,
}: AppSidebarGroupProps) => (
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarGroup className="p-0">
      <SidebarGroupLabel
        asChild
        className="gap-1.5 px-2.5 text-xs font-medium tracking-wide uppercase hover:text-sidebar-foreground"
      >
        <CollapsibleTrigger>
          <CaretDownIcon className="transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
          {group.label}
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            {group.items.map((item) => (
              <AppSidebarMenuItem
                key={item.id}
                item={item}
                isActive={isNavItemActive(pathname, item.href, item.exact)}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
  </Collapsible>
);
