import type { Role } from "@/features/auth/auth.types";

export const InviteUserFormDefaultValues = {
  name: "",
  email: "",
  role: "sales" as Role,
};
