import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import notificationsApi from "../notificationsApi";
import type { Notification } from "../notifications.types";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const enabled = user !== null;

  const { data: notifications = [], isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getNotifications(),
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationsApi.getUnreadCount(),
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({
      queryKey: ["notifications", "unread-count"],
    });
  };

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);
      const previousUnreadCount = queryClient.getQueryData<number>([
        "notifications",
        "unread-count",
      ]);

      queryClient.setQueryData<Notification[]>(["notifications"], (old = []) =>
        old.map((item) =>
          item.id === id ? { ...item, read: true } : item,
        ),
      );

      queryClient.setQueryData<number>(
        ["notifications", "unread-count"],
        (old = 0) => Math.max(0, old - 1),
      );

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_error, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          ["notifications", "unread-count"],
          context.previousUnreadCount,
        );
      }
    },
    onSuccess: invalidate,
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);
      const previousUnreadCount = queryClient.getQueryData<number>([
        "notifications",
        "unread-count",
      ]);

      queryClient.setQueryData<Notification[]>(["notifications"], (old = []) =>
        old.map((item) => ({ ...item, read: true })),
      );
      queryClient.setQueryData<number>(["notifications", "unread-count"], 0);

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount !== undefined) {
        queryClient.setQueryData(
          ["notifications", "unread-count"],
          context.previousUnreadCount,
        );
      }
    },
    onSuccess: invalidate,
  });

  return {
    notifications,
    unreadCount,
    isLoading: isPending,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
  };
};
