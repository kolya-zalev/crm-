import type { TeamMember } from "@/types/team.types";
import type { TeamInvite } from "@/validators";

export interface TeamComponentProps {
  members: TeamMember[];
  isLoading: boolean;
  isInviteOpen: boolean;
  isInviting?: boolean;
  onInviteOpen: () => void;
  onInviteClose: () => void;
  onInvite: (data: TeamInvite) => Promise<void>;
  onDisable: (id: string) => Promise<void>;
}
