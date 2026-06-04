import { useNotes } from "@/features/hooks/useNotes";
import { NoteSectionProps} from "./NotesSection.types";
import { NotesSectionComponent } from "./NotesSection.component";

export function NotesSectionContainer({leadId}: NoteSectionProps){
    const{notes, isLoading, addNote, deleteNote} = useNotes(leadId)

    return(
        <NotesSectionComponent 
        notes={notes}
        isLoading={isLoading}
        onAdd={addNote}
        onDelete={deleteNote}
        
        />
    )
}