"use client";

import { useTheme } from "next-themes";
import { ModeToggleComponents } from "./ModeToggle.component";

export const ModeToggleContainer = () => {
  const { setTheme } = useTheme();
  return <ModeToggleComponents setTheme={setTheme} />;
};
