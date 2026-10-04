"use client";

import * as React from "react";
import { cn } from "cn";
import { Switch as SwitchPrimitive } from "radix-ui";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
};

function Switch({ className, size = "default", ...props }: SwitchProps) {
  const sm = size === "sm";

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input p-px transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "data-[state=checked]:bg-primary data-[checked]:bg-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sm ? "h-3.5 w-6" : "h-5 w-9",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block translate-x-0 rounded-full bg-background shadow-sm transition-transform",
          sm
            ? "size-3 data-[state=checked]:translate-x-2.5 data-[checked]:translate-x-2.5"
            : "size-4 data-[state=checked]:translate-x-4 data-[checked]:translate-x-4",
          "dark:data-[state=checked]:bg-primary-foreground",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
