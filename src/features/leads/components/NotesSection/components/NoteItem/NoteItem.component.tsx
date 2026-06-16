import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/formatDate";
import { Trash } from "lucide-react";
import { NoteItemProps } from "./NoteItem.types";

export const NoteItem = ({ note, onDelete }: NoteItemProps) => {
  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className="flex justify-between items-start py-3">
      <div>
        <p className="text-sm">{note.text}</p>
        <span className="text-xs text-muted-foreground">
          {formatDateTime(note.createdAt)}
        </span>
      </div>
      <Button variant="ghost" onClick={handleDelete}>
        <Trash />
      </Button>
    </div>
  );
};
