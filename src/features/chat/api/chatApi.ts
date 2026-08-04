import { api } from "@/lib/api";
import type { ChatMessage } from "../Chat.types";

const chatApi = {
  getMessages: async (): Promise<ChatMessage[]> => {
    const response = await api.get<ChatMessage[]>("/api/chat/messages");
    return response.data;
  },
  sendMessage: async (text: string): Promise<ChatMessage> => {
    const response = await api.post<ChatMessage>("/api/chat/messages", {
      text,
    });
    return response.data;
  },
};

export default chatApi;
