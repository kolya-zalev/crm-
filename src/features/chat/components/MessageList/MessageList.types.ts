import { ChatMessage } from "../../Chat.types";

export type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: string;
};
