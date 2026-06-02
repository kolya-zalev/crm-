import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineEmojiPeople, MdAccessibilityNew, MdWineBar, MdClose } from "react-icons/md";
import { StatCardProps } from "./StatCard.types";

const statCard = [
  { title: "Total Leads", key: "total", icon: MdOutlineEmojiPeople, color: "text-blue-600" },
  { title: "New", key: "new", icon: MdAccessibilityNew, color: "text-green-600" },
  { title: "Won", key: "won", icon: MdWineBar, color: "text-amber-600" },
  { title: "Lost", key: "lost", icon: MdClose, color: "text-red-600" },
];

export function StatCardComponent({stats}: StatCardProps){
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards">
      {statCard.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];

        return (
          <Card
            key={card.key}
            className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200 "
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
  );
}