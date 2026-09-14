import type { TeamInvite } from "@/validators";

export interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (data: TeamInvite) => void | Promise<void>;
  isLoading?: boolean;
}
