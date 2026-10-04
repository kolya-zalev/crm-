export type UserMenuProps = {
  name: string;
  email: string;
  userId: string;
  role: string;
  isDark: boolean;
  onDarkChange: (checked: boolean) => void;
  onSettings(): void;
  onProfile(): void;
  onLogout(): void;
};
