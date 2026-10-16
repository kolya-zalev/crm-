import { LuMoon, LuSettings, LuUser } from "react-icons/lu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { UserMenuProps } from "./UserMenu.types";
import { UserIcon, GearIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { DoorIcon, DoorOpenIcon } from "@phosphor-icons/react";
export const UserMenuComponent = ({
  name,
  email,
  userId,
  role,
  isDark,
  onProfile,
  onDarkChange,
  onSettings,
  onLogout,
}: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        aria-label="User menu"
        className="overflow-hidden rounded-full p-0 ring-2 ring-border ring-offset-2 ring-offset-background"
      >
        <Avatar size="sm">
          <AvatarFallback className="bg-muted">
            <LuUser className="size-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      sideOffset={10}
      onCloseAutoFocus={(event) => event.preventDefault()}
      className="w-max min-w-85 rounded-2xl border border-border/60 p-2 font-sans shadow-lg"
    >
      <DropdownMenuLabel className="flex items-center gap-3 px-2.5 pt-2 pb-3 font-normal">
        <Avatar className="size-11">
          <AvatarFallback className="bg-muted">
            <LuUser className="size-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <span className="truncate text-sm font-semibold leading-tight text-foreground">
            {name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {email}
          </span>
          <span className="mt-0.5 whitespace-nowrap font-mono text-xs leading-tight text-muted-foreground/70 select-all">
            {userId}
          </span>
          <span className="mt-0.5 truncate font-mono text-xs text-muted-foreground/70 select-all">
            Role: {role}
          </span>
        </span>
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="-mx-2 my-1.5" />
      <DropdownMenuItem
        onSelect={onProfile}
        className={cn(
          "gap-3 rounded-lg px-2.5 py-2 font-sans text-sm text-foreground cursor-pointer",
          "[&_svg:not([role=switch]_*)]:size-4.5 [&>svg]:text-foreground/70",
          "focus:bg-muted",
        )}
      >
        <UserIcon className="size-4" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuSeparator className="-mx-2 my-1.5" />

      <DropdownMenuItem
        onSelect={onSettings}
        className={cn(
          "gap-3 rounded-lg px-2.5 py-2 font-sans text-sm text-foreground cursor-pointer",
          "[&_svg:not([role=switch]_*)]:size-4.5 [&>svg]:text-foreground/70",
          "focus:bg-muted",
        )}
      >
        <GearIcon />
        Settings
      </DropdownMenuItem>

      <DropdownMenuSeparator className="-mx-2 my-1.5" />

      <DropdownMenuItem
        className={cn(
          "gap-3 rounded-lg px-2.5 py-2 font-sans text-sm text-foreground cursor-pointer",
          "[&_svg:not([role=switch]_*)]:size-4.5 [&>svg]:text-foreground/70",
          "focus:bg-muted ",
        )}
        onSelect={(event) => {
          event.preventDefault();
          onDarkChange(!isDark);
        }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
        Dark Mode
        <Switch
          size="sm"
          className="ml-auto"
          checked={isDark}
          aria-label="Dark mode"
          onCheckedChange={onDarkChange}
          onClick={(event) => event.stopPropagation()}
        />
      </DropdownMenuItem>

      <DropdownMenuSeparator className="-mx-2 my-1.5" />

      <DropdownMenuItem
        onSelect={onLogout}
        className={cn(
          "gap-3 rounded-lg px-2.5 py-2 font-sans text-sm text-foreground cursor-pointer",
          "[&_svg:not([role=switch]_*)]:size-4.5 [&>svg]:text-foreground/70",
          "focus:bg-muted group justify-center",
        )}
      >
        <DoorIcon className="group-hover:hidden" />
        <DoorOpenIcon className="hidden group-hover:block" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
