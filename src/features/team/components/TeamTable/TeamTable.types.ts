import type { TeamMember } from "@/types";
export interface TeamTableProps {
  members: TeamMember[];
  isLoading: boolean;
  onDisable: (id: string) => void;
}
