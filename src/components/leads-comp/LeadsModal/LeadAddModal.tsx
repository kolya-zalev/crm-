import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/lib/types/lead";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaLeadAdd,
  LeadAddFormValues,
} from "@/components/leads-comp/LeadsFormEditor/LeadsFormEditor.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const form = useForm({
    resolver: zodResolver(schemaLeadAdd),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "new",
      tags: [],
      notes: "",
      source: "",
    },
  });
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <span>Enter name</span>
          <Input {...form.register("name")} placeholder="Name" />
          <Input {...form.register("email")} placeholder="Email" />
          <Input {...form.register("phone")} placeholder="Phone" />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
