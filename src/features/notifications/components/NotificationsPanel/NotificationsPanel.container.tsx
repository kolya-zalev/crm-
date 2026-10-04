"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import type { AppNotification } from "@/types";
import { NotificationsPanelComponent } from "./NotificationsPanel.component";

export const NotificationsPanelContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { state } = useSidebar();
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

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

  const isSidebarHidden = state === "collapsed";

  return (
    <NotificationsPanelComponent
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      panelOffset={isSidebarHidden ? "0rem" : "16rem"}
      panelWidth="20rem"
      notifications={notifications}
      unreadCount={unreadCount}
      isLoading={isLoading}
      onItemClick={handleItemClick}
      onMarkAllAsRead={() => void markAllAsRead()}
    />
  );
};
