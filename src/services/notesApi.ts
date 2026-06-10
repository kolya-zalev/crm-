import {Note} from "@/hooks/types";
import {api} from "@/lib/api";

const notesApi = {
    getNotesByLead: async(leadId: string) => {
        const response = await api.get<Note[]>(`/api/leads/${leadId}/notes`);
        return response.data;
    },
    createNote: async(leadId: string, data: {text: string}) => {
        const response = await api.post<Note>(`/api/leads/${leadId}/notes`, data);
        return response.data;
    },
    deleteNote: async(leadId: string,noteId: string) => {
        const response = await api.delete(`/api/leads/${leadId}/notes/${noteId}`);
        return response.data;
    },
}

export default notesApi;