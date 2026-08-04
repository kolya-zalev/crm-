"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import chatApi from "@/features/chat/api/chatApi";
import { ChatNameSse, ChatMessage } from "@/features/chat/Chat.types";

export const chatMessagesQueryKey = ["chat", "messages"] as const;

export const appendMessage = (
  oldMessages: ChatMessage[] = [],
  newMessage: ChatMessage,
): ChatMessage[] => {
  return [...oldMessages, newMessage];
};

export const useChatMessages = () => {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const accessToken = session?.accessToken;
  const queryEnabled = Boolean(accessToken);

  const { data: messages = [], isPending } = useQuery({
    queryKey: chatMessagesQueryKey,
    queryFn: () => chatApi.getMessages(),
    enabled: queryEnabled,
  });
  const sendMutation = useMutation({
    mutationFn: (text: string) => chatApi.sendMessage(text),
  });

  useEffect(() => {
    if (!accessToken) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/api/chat/sse?access_token=${encodeURIComponent(accessToken)}`;
    const eventSource = new EventSource(url);

    const onMessage = (event: MessageEvent<string>) => {
      try {
        const incoming = JSON.parse(event.data) as ChatMessage;
        queryClient.setQueryData<ChatMessage[]>(
          chatMessagesQueryKey,
          (oldMessages) => appendMessage(oldMessages, incoming),
        );
      } catch {}
    };
    eventSource.addEventListener(ChatNameSse.message, onMessage);

    return () => {
      eventSource.removeEventListener(ChatNameSse.message, onMessage);
      eventSource.close();
    };
  }, [accessToken, queryClient]);

  return {
    messages,
    isLoading: sessionStatus === "loading" || (queryEnabled && isPending),
    sendMessage: (text: string) => sendMutation.mutateAsync(text),
    isSending: sendMutation.isPending,
  };
};
