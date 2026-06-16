import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LeadDetailHeaderProps {
  onEditOpen: () => void;
}

export const LeadDetailHeader = ({ onEditOpen }: LeadDetailHeaderProps) => {
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
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 font-normal"
        onClick={onEditOpen}
      >
        Edit
      </Button>
    </>
  );
};
