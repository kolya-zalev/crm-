"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LeadsTableRowActionsComponent } from "./LeadsTableRowActions.component";
import { LeadsTableRowActionsContainerProps } from "./LeadsTableRowActions.types";

export const LeadsTableRowActionsContainer = ({
  lead,
  onEditClick,
  onDelete,
}: LeadsTableRowActionsContainerProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEditClick(lead);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(lead.id);
      toast.success("Lead has been deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <LeadsTableRowActionsComponent
      leadDetailHref={`/lead/${lead.id}`}
      deleteDialogTitle={`Delete Lead ${lead.name}`}
      deleteDialogDescription={`Are you sure you want to delete the lead ${lead.name}?`}
      isDeleteDialogOpen={isDeleteDialogOpen}
      isDeleting={isDeleting}
      onEditClick={handleEditClick}
      onViewClick={handleViewClick}
      onDeleteClick={handleDeleteClick}
      onDeleteDialogOpenChange={setIsDeleteDialogOpen}
      onDeleteConfirm={handleDeleteConfirm}
    />
  );
};
