import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadAddFormValues } from "@/validators";
import { FormStatus, LeadAddModalProps } from "./LeadAddModal.types";
import { LeadAddForm } from "./components/LeadAddForm/LeadAddForm.component";

const emptyLeadValues: LeadAddFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "new",
  tags: [],
  notes: "",
  source: "",
};

export function LeadAddModalComponent({
  open,
  onClose,
  onSubmit,
  formStatus,
  onEdit,
  lead,
}: LeadAddModalProps) {
  const isNew = formStatus === FormStatus.NEW;
  const defaultValues = lead ?? emptyLeadValues;

  const handleSubmit = (data: LeadAddFormValues) => {
    if (isNew) {
      onSubmit(data);
    } else {
      onEdit(lead?.id ?? "", data);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="flex justify-center text-xl">
            {isNew ? "Add New Lead" : "Edit Lead"}
          </DialogTitle>
        </DialogHeader>

        <LeadAddForm
          key={lead?.id ?? "new"}
          isNew={isNew}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onReset={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
