"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import type { AppNotification } from "@/types";
import { NotificationsPanelComponent } from "./NotificationsPanel.component";

export const NotificationsPanelContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    markAsDelete,
  } = useNotifications();

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen);
  };

  const handleItemClick = (notification: AppNotification) => {
    if (!notification.isRead) {
      void markAsRead(notification.id);
    }

    setIsOpen(false);

    if (notification.leadId) {
      router.push(`/lead/${notification.leadId}`);
    }
  };
  const handleMarkAsDelele = () => {
    void markAsDelete();
  };

  return (
    <NotificationsPanelComponent
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      panelWidth="20rem"
      notifications={notifications}
      unreadCount={unreadCount}
      isLoading={isLoading}
      onItemClick={handleItemClick}
      onMarkAllAsRead={() => void markAllAsRead()}
      onMarkAsDelele={handleMarkAsDelele}
    />
  );
};
