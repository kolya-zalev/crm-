import { type ChartConfig } from "@/components/ui/chart";

export const stuckConfig = {
  new: {
    label: "New",
    color: "#8884d8",
  },
  contacted: {
    label: "Contacted",
    color: "#8dd1e1",
  },
  qualified: {
    label: "Qualified",
    color: "#82ca9d",
  },
} satisfies ChartConfig;
