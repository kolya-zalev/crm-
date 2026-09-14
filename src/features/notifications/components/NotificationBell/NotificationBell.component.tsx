import { LuBell } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBellProps } from "./NotificationBell.types";
import { hasUnread } from "./utils/hasUnread";
export const NotificationBellComponent = ({
  notifications,
  unreadCount,
  isLoading,
  onItemClick,
  onMarkAllAsRead,
}: NotificationBellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-muted"
        >
          <LuBell
            className={`size-5 ${hasUnread(unreadCount, notifications) ? "text-red-600" : "text-white-foreground"}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span>Notifications</span>
          {unreadCount > 0 ? (
            <Button
              variant="ghost"
              onClick={onMarkAllAsRead}
              className="cursor-pointer text-xs underline "
            >
              Mark all as read
            </Button>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onSelect={() => onItemClick(notification)}
              className="flex cursor-pointer flex-col items-start gap-1"
            >
              <span
                className={
                  notification.isRead
                    ? "text-muted-foreground text-sm"
                    : "text-sm font-medium"
                }
              >
                {notification.message}
              </span>
              <span className="text-muted-foreground text-sx">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
