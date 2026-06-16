import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesSectionComponentProps } from "./NotesSection.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { NoteItem } from "./components/NoteItem";

export const NotesSectionComponent = ({
  notes,
  isLoading,
  onAdd,
  onDelete,
}: NotesSectionComponentProps) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes ({notes.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a note..."
          />
          <Button
            onClick={handleAdd}
            className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer transition-colors"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-col divide-y mt-4">
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            notes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={onDelete} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
