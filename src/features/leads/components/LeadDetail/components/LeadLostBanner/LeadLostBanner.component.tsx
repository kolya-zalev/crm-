import { Lead } from "@/hooks/types";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
interface LeadLostBannerProps {
  lead: Lead;
  onMarkAsLost: () => Promise<void>;
}

export const LeadLostBanner = ({ lead, onMarkAsLost }: LeadLostBannerProps) => {
  const canMarkAsLost = usePermission("leads:edit");
  if (lead.status !== "lost") {
    return (
      canMarkAsLost && (
        <Button variant="destructive" size="sm" onClick={onMarkAsLost}>
          Mark as Lost
        </Button>
      )
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        X
      </div>
      <span className="text-xs font-medium text-red-500">Lost</span>
    </div>
  );
};
