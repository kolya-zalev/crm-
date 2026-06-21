import { api } from "@/lib/api";
import type { Notification, UnreadCountResponse } from "./notifications.types";

const noCacheHeaders = { "Cache-Control": "no-cache" };

const normalizeNotification = (item: Notification): Notification => ({
  ...item,
  read: item.read === true,
});

const notificationsApi = {
  getNotifications: async () => {
    const response = await api.get<Notification[]>("/api/notifications", {
      headers: noCacheHeaders,
    });
    return response.data.map(normalizeNotification);
  },

  getUnreadCount: async () => {
    const response = await api.get<number | UnreadCountResponse>(
      "/api/notifications/unread-count",
      { headers: noCacheHeaders },
    );
    const data = response.data;
    return typeof data === "number" ? data : data.count;
  },

  markAsRead: async (id: string) => {
    const response = await api.patch<Notification>(
      `/api/notifications/${id}/read`,
    );
    return normalizeNotification(response.data);
  },

  markAllAsRead: async () => {
    await api.post("/api/notifications/read-all");
  },
};

export default notificationsApi;
