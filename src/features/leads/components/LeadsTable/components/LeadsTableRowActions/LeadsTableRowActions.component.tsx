"use client";

import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { LeadsTableRowActionsComponentProps } from "./LeadsTableRowActions.types";
export const LeadsTableRowActionsComponent = ({
  leadDetailHref,
  deleteDialogTitle,
  deleteDialogDescription,
  isDeleteDialogOpen,
  isDeleting,
  canMutateLeads,
  onEditClick,
  onViewClick,
  onDeleteClick,
  onDeleteDialogOpenChange,
  onDeleteConfirm,
}: LeadsTableRowActionsComponentProps) => {
  return (
    <div className="flex flex-row justify-center gap-1">
      {canMutateLeads ? (
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
          onClick={onEditClick}
        >
          <AiFillEdit size={16} />
        </Button>
      ) : null}
      <Link href={leadDetailHref}>
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
          onClick={onViewClick}
        >
          <GrView size={16} />
        </Button>
      </Link>
      {canMutateLeads ? (
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-red-100 hover:text-red-600"
          onClick={onDeleteClick}
        >
          <MdDelete size={16} />
        </Button>
      ) : null}
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onDeleteConfirm}
        isDeleting={isDeleting}
        title={deleteDialogTitle}
        description={deleteDialogDescription}
      />
    </div>
  );
};
