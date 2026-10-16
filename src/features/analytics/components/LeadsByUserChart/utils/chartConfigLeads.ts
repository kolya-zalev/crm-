import { type ChartConfig } from "@/components/ui/chart";

export const barColorsLeads = [
  "#000000",
  "#00A86B",
  "#E48400",
  "#FA8072",
  "#81D8D0",
];

export const chartConfigLeads = {
  leadCount: {
    label: "Leads",
    color: barColorsLeads[0],
  },
} satisfies ChartConfig;
