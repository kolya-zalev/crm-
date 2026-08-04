"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import type { ChatComponentProps } from "./Chat.types";

export const ChatComponent = ({
  messages,
  currentUserId,
  isSending,
  onSend,
}: ChatComponentProps) => {
  return (
    <Card className="flex max-h-[calc(100vh-8rem)] flex-col">
      <CardHeader className="pb-3"></CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <MessageList messages={messages} currentUserId={currentUserId} />
        </div>
        <MessageInput onSend={onSend} isSending={isSending} />
      </CardContent>
    </Card>
  );
};
