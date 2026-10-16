import { LuCheckCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatNotificationTime } from "./utils/formatNotificationTime";
import type { NotificationsPanelProps } from "./NotificationsPanel.types";
import { BellIcon, TrashIcon } from "@phosphor-icons/react";

export const NotificationsPanelComponent = ({
  isOpen,
  onOpenChange,
  panelWidth,
  notifications,
  unreadCount,
  isLoading,
  onItemClick,
  onMarkAllAsRead,
  onMarkAsDelele,
}: NotificationsPanelProps) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon-lg">
        <BellIcon
          className={cn(
            "size-5",
            unreadCount > 0 ? "text-destructive" : "text-muted-foreground",
          )}
        />
      </Button>
    </SheetTrigger>

    <SheetContent
      side="right"
      showCloseButton={false}
      style={{ width: panelWidth, maxWidth: panelWidth }}
      className="border-l p-0 rounded-3xl"
    >
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <SheetTitle className="text-xs font-medium">Notifications</SheetTitle>

        <div className="flex items-center gap-1">
          {unreadCount > 0 ? (
            <Button variant="ghost" size="icon" onClick={onMarkAllAsRead}>
              <LuCheckCheck className="size-4" />
            </Button>
          ) : null}

          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm">
              <LuX className="size-4" />
            </Button>
          </SheetClose>
          {notifications.length > 0 ? (
            <Button variant="ghost" size="icon" onClick={onMarkAsDelele}>
              <TrashIcon className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-20" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-muted-foreground p-6 text-center text-xs">
            No notifications
          </p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <Button
                  variant="ghost"
                  onClick={() => onItemClick(notification)}
                  className={cn(
                    "h-auto w-full items-start justify-start gap-2.5 whitespace-normal rounded-4xl border-b px-4 py-3 text-left hover:bg-sidebar-accent",
                    !notification.isRead && "bg-sidebar-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 size-1.5 shrink-0 rounded-full",
                      notification.isRead ? "bg-transparent" : "bg-destructive",
                    )}
                  />

                  <span className="flex min-w-0 flex-col gap-1">
                    <span
                      className={cn(
                        "text-xs leading-snug whitespace-normal",
                        notification.isRead
                          ? "text-muted-foreground"
                          : "text-foreground font-medium",
                      )}
                    >
                      {notification.message}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatNotificationTime(notification.createdAt)}
                    </span>
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SheetContent>
  </Sheet>
);
