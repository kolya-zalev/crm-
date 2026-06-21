import type { Notification } from "../../notifications.types";

export type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
};
