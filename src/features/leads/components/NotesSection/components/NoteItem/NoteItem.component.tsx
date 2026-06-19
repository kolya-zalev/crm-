import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/formatDate";
import { Trash } from "lucide-react";
import { NoteItemProps } from "./NoteItem.types";

export const NoteItem = ({
  note,
  onDelete,
  canDelete = true,
}: NoteItemProps) => {
  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className="flex items-start justify-between py-3">
      <div>
        <p className="text-sm">{note.text}</p>
        <span className="text-muted-foreground text-xs">
          {formatDateTime(note.createdAt)}
        </span>
      </div>
      {canDelete && (
        <Button variant="ghost" onClick={handleDelete}>
          <Trash />
        </Button>
      )}
    </div>
  );
};
