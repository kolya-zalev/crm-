import notesApi from "@/services/notesApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useNotes(leadId: string){
  const queryClient = useQueryClient();
  const {data: notes = [], isPending} = useQuery({
    queryKey: ["leads", leadId, "notes"],
    queryFn: () => notesApi.getNotesByLead(leadId),
  });

  const createNoteMutation = useMutation({
    mutationFn: (data: {text: string}) => notesApi.createNote(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["leads", leadId, "notes"]})
    }
  })

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => notesApi.deleteNote(leadId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["leads", leadId, "notes"]})
    }
  })

  const createNote = (text: string) => createNoteMutation.mutateAsync({text})
  const deleteNote = (noteId: string) => deleteNoteMutation.mutateAsync(noteId)

  return  {notes, isLoading: isPending, createNote, deleteNote };
}