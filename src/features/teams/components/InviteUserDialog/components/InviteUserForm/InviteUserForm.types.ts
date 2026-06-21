import type { InviteUserDto } from "../../../../teams.types";

export type InviteUserFormProps = {
  onSubmit: (data: InviteUserDto) => Promise<void>;
  onCancel: () => void;
};
