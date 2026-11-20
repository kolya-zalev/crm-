import { AppRoute } from "@/config/routes";
export type UserMenuProps = {
  name: string;
  email: string;
  userId: string;
  role: string;
  isDark: boolean;
  onDarkChange: (checked: boolean) => void;
  onNavigate: (route: AppRoute) => void;
  onLogout(): void;
};
