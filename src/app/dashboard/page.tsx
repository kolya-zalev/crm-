"use client";

import { useLeads } from "../_features/leads/hooks/UseLeads";
import {
  MdOutlineEmojiPeople,
  MdAccessibilityNew,
  MdWineBar,
  MdClose,
} from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
const statusBars = [
  { status: "new", label: "New", color: "bg-blue-500" },
  { status: "contacted", label: "Contacted", color: "bg-sky-500" },
  { status: "qualified", label: "Qualified", color: "bg-purple-500" },
  { status: "won", label: "Won", color: "bg-green-500" },
  { status: "lost", label: "Lost", color: "bg-red-500" },
];

const statCard = [
  {
    title: "Total Leads",
    key: "total",
    icon: MdOutlineEmojiPeople,
    color: "text-blue-600",
  },
  {
    title: "New",
    key: "new",
    icon: MdAccessibilityNew,
    color: "text-green-600",
  },
  { title: "Won", key: "won", icon: MdWineBar, color: "text-amber-600" },
  { title: "Lost", key: "lost", icon: MdClose, color: "text-red-600" },
];
export default function DashboardPage() {
  const { leads, isLoading } = useLeads();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  const stats: Record<string, number> = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards">
        {statCard.map((card) => {
          const Icon = card.icon;
          const value = stats[card.key];

          return (
            <Card
              key={card.key}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium text-muted-foreground uppercase tracking-wider">
                  {card.title}
                </CardTitle>
                <div className="p-2 rounded-md bg-slate-50">
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-4xl font-bold tracking-tight">{value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-2000  fill-mode-forwards">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Leads by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {statusBars.map((bar) => {
                const count = stats[bar.status];
                const percent =
                  stats.total === 0
                    ? 0
                    : Math.round((count / stats.total) * 100);

                return (
                  <div key={bar.status} className="flex items-center gap-3">
                    <span className="w-24 text-sm">
                      {bar.label}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${bar.color} rounded-full h-2 `}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium ">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="border border-dashed rounded-xl p-8 min-h-75 flex items-center justify-center text-muted-foreground bg-slate-50/50 animate-in fade-in slide-in-from-bottom-8 duration-2000 fill-mode-forwards">
          [ analytics]
        </div>
      </div>

      <div className="border border-dashed rounded-xl p-8 min-h-37.5 flex items-center justify-center text-muted-foreground bg-slate-50/50 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards">
        [...]
      </div>
    </div>
  );
}
