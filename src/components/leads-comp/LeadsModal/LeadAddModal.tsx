import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/lib/types/lead";


interface LeadAddModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Lead, "id">) => void;

}

export const LeadAddModal = ({
  open,
  onClose,
  onSubmit,
}: LeadAddModalProps) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
