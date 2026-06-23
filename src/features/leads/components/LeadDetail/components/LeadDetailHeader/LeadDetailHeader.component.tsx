import Link from "next/link";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadDetailHeaderProps } from "./LeadDetailHeader.types";

export const LeadDetailHeader = ({ onEditOpen }: LeadDetailHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <Link href="/lead">
        <Button
          variant="ghost"
          className="h-auto cursor-pointer p-0 font-normal text-muted-foreground hover:text-foreground"
        >
          ← Back to Leads
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="h-auto cursor-pointer p-0 font-normal text-muted-foreground hover:text-foreground"
        onClick={onEditOpen}
      >
        Edit
      </Button>
    </CardHeader>
  );
};
