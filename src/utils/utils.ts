export type NavItem = {
  id: string;
  href: string;
  label: string;
};

export const brand = {
  href: "/",
  label: "Home",
} as const;

export const sidebarItems: NavItem[] = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard" },
  { id: "leads", href: "/lead", label: "Leads" },
  { id: "settings", href: "/settings", label: "Settings" },
];

export const authRoutes = {
  login: { href: "/login", label: "Log in" },
  signup: { href: "/signup", label: "Sign up" },
} as const;

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
