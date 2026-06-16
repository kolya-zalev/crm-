interface DeleteLeadDialogProps {
  leadName: string;
  onDelete: () => Promise<void>;
  trigger: React.ReactNode;
}

export type { DeleteLeadDialogProps };
