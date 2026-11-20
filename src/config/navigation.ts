import {
  LuLayoutDashboard,
  LuUsersRound,
  LuSettings,
  LuTags,
} from "react-icons/lu";
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

import { CiCalendar } from "react-icons/ci";
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
    icon: CiCalendar,
    description:
      "Manage your calendar, track your events, and organize your schedule",
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: LuSettings,
    description:
      "Configure your workspace, manage team access, and customize preferences",
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
