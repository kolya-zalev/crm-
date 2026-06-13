import {
  LuLayoutDashboard,
  LuUsersRound,
  LuSettings,
  LuArchive,
} from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { IconType } from "react-icons";

export type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: IconType;
  description: string;
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
    icon: LuLayoutDashboard,
    description:
      "Track performance metrics, monitor sales pipeline, and view real-time analytics",
  },
  {
    id: "leads",
    href: "/lead",
    label: "Leads",
    icon: LuUsersRound,
    description:
      "Manage your contacts, track deal progress, and organize your sales pipeline",
  },
  {
    id: "tasks",
    href: "/tasks",
    label: "Tasks",
    icon: FaTasks,
    description:
      "Manage, track, and control your daily action items for active leads.",
  },
  {
    id: "archive",
    href: "/archive",
    label: "Archive",
    icon: LuArchive,
    description:
      "Archive your leads, tasks, and other data for future reference",
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

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
