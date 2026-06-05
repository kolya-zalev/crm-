import { LuLayoutDashboard, LuUsersRound, LuSettings  } from "react-icons/lu";
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
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard, description: 'Track performance metrics, monitor sales pipeline, and view real-time analytics'},
  { id: "leads", href: "/lead", label: "Leads", icon: LuUsersRound, description: 'Manage your contacts, track deal progress, and organize your sales pipeline' },
  { id: "settings", href: "/settings", label: "Settings", icon: LuSettings, description: 'Configure your workspace, manage team access, and customize preferences'},
];



export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
