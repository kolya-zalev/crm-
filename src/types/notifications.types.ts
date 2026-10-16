export type NotificationsType =
  | "lead_assigned"
  | "lead_assigned_by_member"
  | "lead_closed"
  | "lead_status_changed"
  | "task_created"
  | "task_deleted";

export type AppNotification = {
  id: string;
  type: NotificationsType;
  message: string;
  leadId: string | null;
  actorName: string;
  isRead: boolean;
  createdAt: string;
};
export type NotificationList = {
  items: AppNotification[];
  unreadCount: number;
};
