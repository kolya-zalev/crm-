import type { AppNotification } from "@/types";

export type NotificationBellProps = {
  notifications: AppNotification[];
  unreadCount: number;
  isLoading: boolean;
  onItemClick: (notification: AppNotification) => void;
  onMarkAllAsRead: () => void;
};
