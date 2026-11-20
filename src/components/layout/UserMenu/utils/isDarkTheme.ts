export const isDarkTheme = (
  resolvedTheme: string | undefined,
  isMounted: boolean,
): boolean => isMounted && resolvedTheme === "dark";
