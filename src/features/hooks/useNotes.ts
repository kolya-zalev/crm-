import { useState, useEffect } from "react";
import {  Note } from "@/hooks/types";

export function useNotes(leadId: string){
 const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

  useEffect(() => {
    fetch(`${BASE}/api/leads/${leadId}/notes`)
      .then((r) => r.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [leadId]);

  const addNote = async (text: string) => {
    const response = await fetch(`${BASE}/api/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({text}),
    });
    const newNote = await response.json();
    setNotes((prev) => [...prev, newNote]);
    return newNote;
  };

  const deleteNote = async (noteId: string) => {
    await fetch(`${BASE}/api/leads/${leadId}/notes/${noteId}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };


  return  {notes, isLoading, addNote, deleteNote };

}