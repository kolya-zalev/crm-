import { NotificationItem } from "../NotificationItem/NotificationItem.component";
import { NotificationsListProps } from "./NotificationsList.types";

export const NotificationsList = ({
  notifications,
  onMarkAsRead,
}: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <p className="text-muted-foreground py-3 text-center text-sm">
        No notifications found
      </p>
    );
  }

  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </>
  );
};
