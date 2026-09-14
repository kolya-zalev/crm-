import { AppNotification } from "@/types";

export const hasUnread = (
  unreadCount: number,
  notifications: AppNotification[],
) =>
  unreadCount > 0 || notifications.some((notification) => !notification.isRead);
