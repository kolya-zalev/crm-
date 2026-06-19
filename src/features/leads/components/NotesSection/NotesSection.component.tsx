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
  canCreate = true,
  canDelete = true,
}: NotesSectionComponentProps) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
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
        {canCreate && (
          <div className="flex gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a note..."
            />
            <Button
              onClick={handleAdd}
              className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
            >
              Add
            </Button>
          </div>
        )}

        <div className="mt-4 flex flex-col divide-y">
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                canDelete={canDelete}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
