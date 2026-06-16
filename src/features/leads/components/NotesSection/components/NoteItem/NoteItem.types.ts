import { Note } from "@/hooks/types";

export interface NoteItemProps {
  note: Note;
  onDelete: (noteId: string) => void;
}
