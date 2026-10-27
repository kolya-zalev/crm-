import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { RolePermissionGroupProps } from "./RolePermissionGroup.types";

export const RolePermissionGroupComponent = ({
  group,
}: RolePermissionGroupProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {group.group}
    </span>
    <ul className="flex flex-col gap-1.5">
      {group.permissions.map((permission) => (
        <li
          key={permission.code}
          className={cn(
            "flex items-center gap-2 text-sm",
            !permission.isGranted && "text-muted-foreground",
          )}
        >
          {permission.isGranted ? (
            <CheckIcon className="size-4 shrink-0 text-green-600 dark:text-green-400" />
          ) : (
            <XIcon className="size-4 shrink-0 text-red-600" />
          )}
          {permission.label}
        </li>
      ))}
    </ul>
  </div>
);
