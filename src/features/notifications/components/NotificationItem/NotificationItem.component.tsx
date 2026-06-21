"use client";

import { formatDateTime } from "@/utils/formatDate";
import type { NotificationItemProps } from "./NotificationItem.types";

export const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const isUnread = notification.read !== true;

  return (
    <button
      type="button"
      onClick={() => onMarkAsRead(notification.id)}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-gray-100 ${
        isUnread ? "bg-blue-50/60" : "opacity-70"
      }`}
    >
      <div className="relative size-10 shrink-0 rounded-full bg-blue-500">
        {isUnread && (
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-muted-foreground text-sm">{notification.message}</p>
        <span className="text-muted-foreground text-xs">
          {formatDateTime(notification.createdAt)}
        </span>
      </div>
    </button>
  );
};
