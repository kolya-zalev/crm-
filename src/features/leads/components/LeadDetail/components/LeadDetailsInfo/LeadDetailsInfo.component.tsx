import { NotebookPen, SquareArrowRightEnter, Tags } from "lucide-react";
import { LeadDetailsInfoProps } from "./LeadDetailsInfo.types";

export const LeadDetailsInfo = ({ lead }: LeadDetailsInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Details
      </h3>
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <NotebookPen className="size-3.5" />
            <span>Notes</span>
          </div>
          <p className="whitespace-pre-wrap text-sm font-medium">
            {lead.notes || "—"}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <SquareArrowRightEnter className="size-3.5" />
            <span>Source</span>
          </div>
          <p className="text-sm font-medium">{lead.source || "—"}</p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Tags className="size-3.5" />
            <span>Tags</span>
          </div>
          <p className="text-sm font-medium">
            {lead.tags?.length > 0 ? lead.tags.join(", ") : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};
