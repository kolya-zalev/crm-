import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLeadAdd, LeadAddFormValues } from "@/validators";
import { FormStatus, LeadAddModalProps } from "./LeadAddModal.types";
import { LeadFormDefaultValues } from "./LeadAddModal.constants";
import { LeadAddForm } from "./components/LeadAddForm/LeadAddForm.component";

export const LeadAddModalComponent = ({
  open,
  onClose,
  onSubmit,
  formStatus,
  onEdit,
  lead,
}: LeadAddModalProps) => {
  const isNew = formStatus === FormStatus.NEW;

  const form = useForm({
    resolver: zodResolver(schemaLeadAdd),
    defaultValues: lead ?? LeadFormDefaultValues,
  });

  const handleSubmit = (data: LeadAddFormValues) => {
    if (isNew) {
      onSubmit(data);
    } else {
      onEdit(lead?.id ?? "", data);
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl flex justify-center">
            Add New Lead
          </DialogTitle>
        </DialogHeader>

        <LeadAddForm
          form={form}
          isNew={isNew}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </DialogContent>
    </Dialog>
  );
};
