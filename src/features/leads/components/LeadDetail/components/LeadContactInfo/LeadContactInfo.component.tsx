import { Mail, Phone, Building2 } from "lucide-react";
import { LeadContactInfoProps } from "./LeadContactInfo.types";

export const LeadContactInfo = ({ lead }: LeadContactInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Contact Info
      </h3>
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5" />
            <span>Email</span>
          </div>
          <p className="text-sm font-medium">{lead.email}</p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3.5" />
            <span>Phone</span>
          </div>
          <p className="text-sm font-medium">{lead.phone}</p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="size-3.5" />
            <span>Company</span>
          </div>
          <p className="text-sm font-medium">{lead.company}</p>
        </div>
      </div>
    </div>
  );
};
