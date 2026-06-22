import { Note } from "@/hooks/types";

export interface NoteSectionProps{
    leadId: string
    
}

export interface NotesSectionComponentProps{
    notes: Note[];
    isLoading: boolean;
    onAdd: (text: string) => void;
    onDelete: (noteId: string) => void

}