import type { Notification } from "../../notifications.types";

export type NotificationsListProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
};