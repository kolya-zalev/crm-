import { format } from "date-fns";
import type { MessageListProps } from "./MessageList.types";

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => {
        const isOwn = message.authorId === currentUserId;
        return (
          <li key={message.id} className={isOwn ? "text-right" : "text-left"}>
            <div className="inline-block max-w-[80%] rounded-md border px-3 py-2 text-left">
              <div className="text-muted-foreground mb-1 text-xs">
                {message.authorName} {"- "}
                {format(new Date(message.createdAt), "HH:mm")}
              </div>
              <p className="whitespace-pre-wrap text-sm">{message.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
