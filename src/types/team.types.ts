export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  status: "active" | "invited" | "disabled";
  invitedAt?: string;
  joinedAt?: string;
};
