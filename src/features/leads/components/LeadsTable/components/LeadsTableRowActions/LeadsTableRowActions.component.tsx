"use client";

import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteLeadDialog } from "../DeleteLeadDialog/DeleteLeadDialog.component";
import { LeadsTableRowActionsProps } from "./LeadsTableRowActions.types";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
export const LeadsTableRowActions = ({
  lead,
  onEditClick,
  onDelete,
}: LeadsTableRowActionsProps) => {
  const canEditLead = usePermission("leads:edit");
  const canViewLead = usePermission("leads:view");
  const canDeleteLead = usePermission("leads:delete");
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEditClick(lead);
  };

  const handleDelete = async () => {
    await onDelete(lead.id);
    toast.success("Lead has been deleted successfully");
  };

  return (
    <div className="flex flex-row justify-center gap-1">
      {canEditLead && (
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
          onClick={handleEditClick}
        >
          <AiFillEdit size={16} />
        </Button>
      )}
      {canViewLead && (
        <Link href={`/lead/${lead.id}`}>
          <Button
            variant="ghost"
            className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
          >
            <GrView size={16} />
          </Button>
        </Link>
      )}
      {canDeleteLead && (
        <DeleteLeadDialog
          leadName={lead.name}
          onDelete={handleDelete}
          trigger={
            <Button
              variant="ghost"
              className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-red-100 hover:text-red-600"
            >
              <MdDelete size={16} />
            </Button>
          }
        />
      )}
    </div>
  );
};
