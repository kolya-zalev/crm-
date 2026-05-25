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
  const formReset = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl flex justify-center">Add New Lead</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(formReset)}
          className="flex flex-col gap-3"
        >
        

            <label className="text-sm font-medium" > Enter name</label>
            
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

          <select {...form.register("status")} className="border-2 border-gray-500 rounded-xl p-2 w-full">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          
          {/* <Input {...form.register("tags")} placeholder="Tags" /> */}
          <label>Notes</label>
          <Input {...form.register("notes")} placeholder="Notes" />
          <label>Source</label>
          <Input {...form.register("source")} placeholder="Source" />
          <Button type="submit" className="w-full  border rounded-xl p-4">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
