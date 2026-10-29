"use client";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import notificationsApi from "@/features/notifications/api/notificationsApi";
import { notificationSseEvents } from "@/features/notifications/notifications.constants";
import type { AppNotification, NotificationList } from "@/types";

export const notificationsQuerykey = ["notifications"] as const;

export const prependNotification = (
  list: NotificationList | undefined,
  incoming: AppNotification,
): NotificationList => {
  const previous = list ?? { items: [], unreadCount: 0 };
  if (previous.items.some((item) => item.id === incoming.id)) {
    return previous;
  }
  return {
    items: [incoming, ...previous.items],
    unreadCount: previous.unreadCount + (incoming.isRead ? 0 : 1),
  };
};

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { data: session, isPending: isSessionPending } = useSession();
  const userId = session?.user.id;
  const queryEnabled = Boolean(userId);

  const { data, isPending } = useQuery({
    queryKey: notificationsQuerykey,
    queryFn: () => notificationsApi.getNotifications(),
    enabled: queryEnabled,
    retry: false,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: (list) => {
      queryClient.setQueryData(notificationsQuerykey, list);
    },
  });
  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: (list) => {
      queryClient.setQueryData(notificationsQuerykey, list);
    },
  });
  const markAsDeleteMutation = useMutation({
    mutationFn: () => notificationsApi.markAllDelete(),
    onSuccess: (list) => {
      queryClient.setQueryData(notificationsQuerykey, list);
    },
  });

  useEffect(() => {
    if (!userId) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/api/notifications/sse`;
    const eventSource = new EventSource(url, { withCredentials: true });

    const onNotification = (event: MessageEvent<string>) => {
      try {
        const incoming = JSON.parse(event.data) as AppNotification;
        queryClient.setQueryData<NotificationList>(
          notificationsQuerykey,
          (list) => prependNotification(list, incoming),
        );
        toast(incoming.message);
      } catch {}
    };

    eventSource.addEventListener(
      notificationSseEvents.notification,
      onNotification,
    );

    return () => {
      eventSource.removeEventListener(
        notificationSseEvents.notification,
        onNotification,
      );
      eventSource.close();
    };
  }, [userId, queryClient]);

  return {
    notifications: data?.items ?? [],
    unreadCount: data?.unreadCount ?? 0,
    isLoading: isSessionPending || (queryEnabled && isPending),
    markAsRead: (id: string) => markAsReadMutation.mutateAsync(id),
    markAllAsRead: () => markAllAsReadMutation.mutateAsync(),
    markAsDelete: () => markAsDeleteMutation.mutateAsync(),
  };
};
