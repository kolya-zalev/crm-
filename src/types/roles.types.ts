import type { TeamMember } from "./team.types";

export type RoleInfo = {
  role: TeamMember["role"];
  permissions: string[];
};

