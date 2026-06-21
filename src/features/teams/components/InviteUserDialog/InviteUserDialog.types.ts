import type { InviteUserDto } from "../../teams.types";

export type InviteUserDialogProps = {
  onInvite: (data: InviteUserDto) => Promise<void>;
};
