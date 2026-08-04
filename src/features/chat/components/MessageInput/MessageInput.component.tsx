"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MessageInputComponentProps } from "./MessageInput.types";

export const MessageInput = ({
  text,
  setText,
  isSending,
  onSubmit,
  onKeyDown,
}: MessageInputComponentProps) => {
  return (
    <div className="flex gap-2">
      <Textarea
        className="min-h-20 flex-1"
        value={text}
        disabled={isSending}
        placeholder="Write a message…"
        onChange={(event) => setText(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        type="button"
        disabled={isSending || !text.trim()}
        onClick={onSubmit}
      >
        Send
      </Button>
    </div>
  );
};
