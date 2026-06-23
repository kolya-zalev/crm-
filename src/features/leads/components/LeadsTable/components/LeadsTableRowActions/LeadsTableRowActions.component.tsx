"use client";

import Link from "next/link";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { LeadsTableRowActionsProps } from "./LeadsTableRowActions.types";

export const LeadsTableRowActions = ({
  lead,
  onEditClick,
  onDelete,
}: LeadsTableRowActionsProps) => {
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
      <Button
        variant="ghost"
        className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
        onClick={handleEditClick}
      >
        <AiFillEdit size={16} />
      </Button>
      <Link href={`/lead/${lead.id}`}>
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-gray-200"
        >
          <GrView size={16} />
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="h-8 w-8 cursor-pointer rounded-xl p-0 text-black hover:bg-red-100 hover:text-red-600"
        onClick={handleDelete}
      >
        <MdDelete size={16} />
      </Button>
    </div>
  );
};
