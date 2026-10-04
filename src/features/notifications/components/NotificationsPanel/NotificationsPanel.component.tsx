import { LuBell, LuCheckCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatNotificationTime } from "./utils/formatNotificationTime";
import type { NotificationsPanelProps } from "./NotificationsPanel.types";
import { BellIcon } from "@phosphor-icons/react";

export const NotificationsPanelComponent = ({
  isOpen,
  onOpenChange,
  panelOffset,
  panelWidth,
  notifications,
  unreadCount,
  isLoading,
  onItemClick,
  onMarkAllAsRead,
}: NotificationsPanelProps) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SidebarMenuItem>
      <SheetTrigger asChild>
        <SidebarMenuButton
          isActive={isOpen}
          className="h-9 gap-2.5 rounded-md px-2.5 text-sm [&_svg]:size-5"
        >
          <BellIcon />
          <span>Notifications</span>
        </SidebarMenuButton>
      </SheetTrigger>

      {unreadCount > 0 ? (
        <SidebarMenuBadge className="text-xs font-medium tabular-nums">
          {unreadCount}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>

    <SheetContent
      side="left"
      showCloseButton={false}
      style={{ left: panelOffset, width: panelWidth, maxWidth: panelWidth }}
      className="border-r p-0"
    >
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <SheetTitle className="text-xs font-medium">
          Notifications
        </SheetTitle>

        <div className="flex items-center gap-1">
          {unreadCount > 0 ? (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Mark all as read"
              onClick={onMarkAllAsRead}
            >
              <LuCheckCheck className="size-4" />
            </Button>
          ) : null}

          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close notifications"
            >
              <LuX className="size-4" />
            </Button>
          </SheetClose>
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
                    "h-auto w-full items-start justify-start gap-2.5 whitespace-normal rounded-none border-b px-4 py-3 text-left hover:bg-sidebar-accent",
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
