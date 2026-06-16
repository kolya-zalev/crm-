import { Lead } from "@/hooks/types";
import { DetailField } from "@/components/DetailField/DetailField.component";
import { formatTags } from "@/utils/formatTags";
import { NotebookPen, SquareArrowRightEnter, Tags } from "lucide-react";

interface LeadDetailsInfoProps {
  lead: Lead;
}

export const LeadDetailsInfo = ({ lead }: LeadDetailsInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Details
      </h3>
      <div className="space-y-3">
        <DetailField
          icon={NotebookPen}
          label="Notes"
          value={lead.notes || "—"}
          multiline
        />
        <DetailField
          icon={SquareArrowRightEnter}
          label="Source"
          value={lead.source || "—"}
        />
        <DetailField icon={Tags} label="Tags" value={formatTags(lead.tags)} />
      </div>
    </div>
  );
};
