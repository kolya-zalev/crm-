import { AppNotification } from "@/types";

export type NotificationsPanelProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  panelOffset: string;
  panelWidth: string;
  notifications: AppNotification[];
  unreadCount: number;
  isLoading: boolean;
  onItemClick: (notification: AppNotification) => void;
  onMarkAllAsRead: () => void;
};
