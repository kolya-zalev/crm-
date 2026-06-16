import { useNotes } from "@/features/hooks/useNotes";
import { NoteSectionProps} from "./NotesSection.types";
import { NotesSectionComponent } from "./NotesSection.component";

export const NotesSectionContainer = ({leadId}: NoteSectionProps) => {
    const{notes, isLoading, createNote, deleteNote} = useNotes(leadId)

    return(
        <NotesSectionComponent 
        notes={notes}
        isLoading={isLoading}
        onAdd={createNote}
        onDelete={deleteNote}
        
        />
    )
}