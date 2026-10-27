"use client";
import { IconType } from "react-icons";
import {
  ChalkboardIcon,
  ChartBarIcon,
  UsersIcon,
  CheckSquareIcon,
  ChatCenteredTextIcon,
  CalendarIcon,
  ShieldIcon,
} from "@phosphor-icons/react";

export type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: IconType;
  roles?: string[];
  exact?: boolean;
  size?: number;
};
export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};
export const brand = {
  href: "/",
  label: "Home",
} as const;

export const sidebarItems: NavItem[] = [
  {
    id: "dashboard",
    href: "/dashboard",
    label: "Dashboard",
    icon: ChalkboardIcon,
    exact: true,
  },
  {
    id: "analytics",
    href: "/analytics",
    label: "Analytics",
    icon: ChartBarIcon,
    roles: ["admin"],
  },

  {
    id: "leads",
    href: "/lead",
    label: "Leads",
    icon: UsersIcon,
  },
  {
    id: "tasks",
    href: "/tasks",
    label: "Tasks",
    icon: CheckSquareIcon,
  },
  {
    id: "chat",
    href: "/chat",
    label: "Chat",
    icon: ChatCenteredTextIcon,
  },
  {
    id: "calendar",
    href: "/calendar",
    label: "Calendar",
    icon: CalendarIcon,
  },
];
export const teamNavItem: NavItem = {
  id: "team",
  href: "/team",
  label: "Team",
  icon: UsersIcon,
};
export const rolesNavItem: NavItem = {
  id: "roles",
  href: "/roles",
  label: "Roles",
  icon: ShieldIcon,
  roles: ["admin"],
};
export const sidebarGroups: NavGroup[] = [
  {
    id: "user-management",
    label: "User Management",
    items: [teamNavItem, rolesNavItem],
  },
];

export const authRoutes = {
  login: { href: "/login", label: "Log in" },
  signup: { href: "/signup", label: "Sign up" },
} as const;

export const isNavItemActive = (
  pathname: string,
  href: string,
  exact?: boolean,
): boolean => {
  if (href === "/") {
    return pathname === "/";
  }
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const filterByRole = (items: NavItem[], role?: string): NavItem[] => {
  return items.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );
};
