"use client";

import { useState } from "react";
import { MessageInput } from "./MessageInput.component";
import type { MessageInputProps } from "./MessageInput.types";

export const MessageInputContainer = ({
  onSend,
  isSending,
}: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const value = text.trim();
    if (!value || isSending) return;
    await onSend(value);
    setText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <MessageInput
      text={text}
      setText={setText}
      isSending={isSending}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    />
  );
};
