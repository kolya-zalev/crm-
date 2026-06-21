export type DisableMemberDialogProps = {
  memberName: string;
  onDisable: () => void | Promise<void>;
  disabled?: boolean;
};
