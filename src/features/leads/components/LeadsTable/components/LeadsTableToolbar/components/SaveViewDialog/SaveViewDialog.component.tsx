"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SaveViewDialogProps } from "./SaveViewDialog.types";

export const SaveViewDialog = ({ onSaveView }: SaveViewDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setName("");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSave = () => {
    onSaveView(name);
    setName("");
    setOpen(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          Save view
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save view</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="View name"
        />
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
