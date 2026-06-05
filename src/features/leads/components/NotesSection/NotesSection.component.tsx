import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesSectionComponentProps } from "./NotesSection.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash } from "lucide-react";

export function NotesSectionComponent({
  notes,
  isLoading,
  onAdd,
  onDelete,
}: NotesSectionComponentProps) {
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };
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
          <Button onClick={handleAdd} className="cursor-pointer">Add</Button>
        </div>

        <div className="flex flex-col divide-y mt-4">
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="flex justify-between items-start py-3"
              >
                <div>
                  <p className="text-sm">{note.text}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
                <Button variant="ghost" onClick={() => onDelete(note.id)}>
                  <Trash />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
