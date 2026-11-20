export const maxMessage = 2000;

export const ChatNameSse = {
  connected: "connected",
  message: "message",
} as const;

export type ChatMessage = {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

export type ChatComponentProps = {
  messages: ChatMessage[];
  currentUserId: string;
  isLoading: boolean;
  isSending: boolean;
  onSend: (text: string) => Promise<void>;
};
