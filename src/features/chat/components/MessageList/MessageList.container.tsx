import { MessageList } from "./MessageList.component";
import { MessageListProps } from "./MessageList.types";

export const MessageListContainer = ({
  messages,
  currentUserId,
}: MessageListProps) => {
  if (messages.length === 0) {
    return <p className="text-muted-foreground text-sm">No messages yet.</p>;
  }
  return <MessageList messages={messages} currentUserId={currentUserId} />;
};
