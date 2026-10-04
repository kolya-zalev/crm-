"use client";
import { IconType } from "react-icons";
import {
  ChalkboardIcon,
  ChartBarIcon,
  UsersIcon,
  CheckSquareIcon,
  UsersThreeIcon,
  ChatCenteredTextIcon,
  CalendarIcon,
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
    id: "team",
    href: "/team",
    label: "Team",
    icon: UsersThreeIcon,
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

export const authRoutes = {
  login: { href: "/login", label: "Log in" },
  signup: { href: "/signup", label: "Sign up" },
} as const;

export function isNavItemActive(
  pathname: string,
  href: string,
  exact?: boolean,
): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
