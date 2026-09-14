import { type ChartConfig } from "@/components/ui/chart";

export const barColors = [
  "oklch(0.72 0.12 240)",
  "oklch(0.62 0.17 250)",
  "oklch(0.55 0.16 25)",
  "oklch(0.58 0.15 145)",
  "oklch(0.60 0.14 300)",
];

export const chartConfig = {
  total: {
    label: "Closed",
    color: barColors[0],
  },
} satisfies ChartConfig;
