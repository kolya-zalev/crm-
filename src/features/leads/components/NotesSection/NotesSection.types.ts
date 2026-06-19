import { Note } from "@/hooks/types";

export interface NoteSectionProps {
  leadId: string;
  canCreate?: boolean;
  canDelete?: boolean;
}

export interface NotesSectionComponentProps {
  notes: Note[];
  isLoading: boolean;
  onAdd: (text: string) => void;
  onDelete: (noteId: string) => void;
  canCreate?: boolean;
  canDelete?: boolean;
}
