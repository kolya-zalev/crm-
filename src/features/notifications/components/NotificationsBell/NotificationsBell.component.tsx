"use client";

import { useEffect, useRef, useState } from "react";
import { BellIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationsList } from "../NotificationsList/NotificationsList.component";

export const NotificationsBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadItems = notifications.filter(
    (notification) => notification.read !== true,
  );
  const hasUnread = unreadItems.length > 0 || unreadCount > 0;
  const badgeCount = Math.max(unreadCount, unreadItems.length);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-xl"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <BellIcon size={20} />
        {badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {badgeCount > 9 ? "9+" : badgeCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <p className="text-sm font-semibold">Notifications</p>
            {hasUnread && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 py-1 text-xs"
                type="button"
                onClick={() => markAllAsRead()}
              >
                Mark all read
              </Button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto p-1">
            <NotificationsList
              notifications={notifications}
              onMarkAsRead={(id) => markAsRead(id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
