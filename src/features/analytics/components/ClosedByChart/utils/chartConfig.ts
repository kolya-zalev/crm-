import { type ChartConfig } from "@/components/ui/chart";

export const barColors = [
  "#b8860b",
  "#556b2f",
  "#8b0000",
  "#8fbc8f",
  "#b0e0e6",
];

export const chartConfig = {
  total: {
    label: "Closed",
    color: barColors[0],
  },
} satisfies ChartConfig;
