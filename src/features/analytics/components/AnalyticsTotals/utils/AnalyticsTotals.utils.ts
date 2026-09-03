import {
  Check,
  Trophy,
  X,
  EyeClosed,
  BatteryFull,
  type LucideIcon,
} from "lucide-react";
import type { Analytics } from "@/types/analytics";

type TotalsKey = keyof Analytics["totals"];

type AnalyticsCardConfig = {
  title: string;
  key: TotalsKey;
  icon: LucideIcon;
  color: string;
  suffix?: string;
};

export const AnalyticsCardTotals: AnalyticsCardConfig[] = [
  {
    title: "Open",
    key: "open",
    icon: Check,
    color: "text-blue-600",
  },
  {
    title: "Won",
    key: "won",
    icon: Trophy,
    color: "text-green-600",
  },
  {
    title: "Lost",
    key: "lost",
    icon: X,
    color: "text-gray-600",
  },
  {
    title: "Closed",
    key: "closed",
    icon: EyeClosed,
    color: "text-red-600",
  },
  {
    title: "Win Rate",
    key: "winRate",
    icon: BatteryFull,
    color: "text-amber-600",
    suffix: "%",
  },
];
