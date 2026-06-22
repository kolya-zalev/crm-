import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/hooks/types";

interface LeadViewModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadViewModal = ({ lead, onClose }: LeadViewModalProps) => {
  return (
    <Dialog onOpenChange={onClose} open={lead !== null}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col ">Name: {lead?.name}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4 text-base">
          <span>Email: {lead?.email}</span>
          <span>Phone: {lead?.phone}</span>
          <span>Company: {lead?.company}</span>
          <span>
            <Badge variant="outline">Status: {lead?.status}</Badge>
          </span>
          <span> Tags: {lead?.tags.join(", ")}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
