import { useRouter } from "next/navigation";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import type { AppNotification } from "@/types";
import { NotificationBellComponent } from "./NotificationBell.component";

export const NotificationBellContainer = () => {
  const router = useRouter();
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const handleItemClick = (notification: AppNotification) => {
    if (!notification.isRead) {
      void markAsRead(notification.id);
    }
    if (notification.leadId) {
      router.push(`/lead/${notification.leadId}`);
    }
  };
  return (
    <NotificationBellComponent
      notifications={notifications}
      unreadCount={unreadCount}
      isLoading={isLoading}
      onItemClick={handleItemClick}
      onMarkAllAsRead={() => void markAllAsRead()}
    />
  );
};
