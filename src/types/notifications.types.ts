export type NotificationsType =
  | "lead_assigned"
  | "lead_assigned_by_member"
  | "lead_closed";

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

