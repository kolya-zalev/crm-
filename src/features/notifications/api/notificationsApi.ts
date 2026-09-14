import { api } from "@/lib/api";
import { NotificationList } from "@/types";

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationList> => {
    const response = await api.get<NotificationList>("/api/notifications");
    return response.data;
  },
  markAsRead: async (id: string): Promise<NotificationList> => {
    const response = await api.put<NotificationList>(
      `/api/notifications/${id}/read`,
    );
    return response.data;
  },
  markAllAsRead: async (): Promise<NotificationList> => {
    const response = await api.put<NotificationList>(
      `/api/notifications/read-all`,
    );
    return response.data;
  },
};

export default notificationsApi;
