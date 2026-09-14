"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useChatMessages } from "./hooks/useChatMessage";
import { ChatComponent } from "./Chat.component";
import { Spinner } from "@/components/ui/spinner";
export const ChatContainer = () => {
  const { data: session } = useSession();
  const { messages, isLoading, sendMessage, isSending } = useChatMessages();

  const handleSend = async (text: string) => {
    try {
      await sendMessage(text);
    } catch {
      toast.error("Failed to send message");
    }
  };
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-24">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <ChatComponent
      messages={messages}
      isLoading={isLoading}
      isSending={isSending}
      currentUserId={session?.user?.id || "user"}
      onSend={handleSend}
    />
  );
};
