import { Lead } from "@/types";

export type LeadsTableRowActionsContainerProps = {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onDelete: (id: string) => Promise<void>;
};

export type LeadsTableRowActionsComponentProps = {
  leadDetailHref: string;
  deleteDialogTitle: string;
  deleteDialogDescription: string;
  isDeleteDialogOpen: boolean;
  isDeleting: boolean;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onViewClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteConfirm: () => void;
};
