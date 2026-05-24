import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/lib/types/lead";
import { useForm, Controller } from "react-hook-form";
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
          <label>Enter name</label>
          <Input {...form.register("name")} placeholder="Name" />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
          <label>Enter email</label>
          <Input {...form.register("email")} placeholder="Email" />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
          <label>Enter phone</label>
          <Input {...form.register("phone")} placeholder="Phone" />

          <label>Enter company</label>
          <Input {...form.register("company")} placeholder="Company" />
          {form.formState.errors.company && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.company.message}
            </p>
          )}
          <label>Status</label>
          <select {...form.register("status")}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <hr />
          {/* <Input {...form.register("tags")} placeholder="Tags" /> */}
          <label>Notes</label>
          <Input {...form.register("notes")} placeholder="Notes" />
          <label>Source</label>
          <Input {...form.register("source")} placeholder="Source" />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
