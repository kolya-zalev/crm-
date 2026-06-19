import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";

interface LeadDetailHeaderProps {
  onEditOpen: () => void;
}

export const LeadDetailHeader = ({ onEditOpen }: LeadDetailHeaderProps) => {
  const canEditLead = usePermission("leads:edit");
  return (
    <>
      <Link href="/lead">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 font-normal"
        >
          ← Back to Leads
        </Button>
      </Link>
      {canEditLead && (
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 font-normal"
          onClick={onEditOpen}
        >
          Edit
        </Button>
      )}
    </>
  );
};
