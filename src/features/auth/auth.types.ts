export type Role = "admin" | "manager" | "sales" | "viewer";
export type UserStatus = "active" | "invited" | "disabled";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  workspaceId: string;
};

export type AuthResponse = { accessToken: string; user: User };
export type LoginDto = { email: string; password: string };
export type RegisterDto = { email: string; password: string; name: string };