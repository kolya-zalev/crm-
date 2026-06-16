import { Lead } from "@/hooks/types";
import { DetailField } from "@/components/DetailField/DetailField.component";
import { Mail, Phone, Building2 } from "lucide-react";

interface LeadContactInfoProps {
  lead: Lead;
}

export const LeadContactInfo = ({ lead }: LeadContactInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Contact Info
      </h3>
      <div className="space-y-3">
        <DetailField icon={Mail} label="Email" value={lead.email} />
        <DetailField icon={Phone} label="Phone" value={lead.phone ?? "—"} />
        <DetailField icon={Building2} label="Company" value={lead.company} />
      </div>
    </div>
  );
};
