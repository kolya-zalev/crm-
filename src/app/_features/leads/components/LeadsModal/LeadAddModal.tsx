import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/app/_features/leads/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaLeadAdd,
  LeadAddFormValues,
} from "@/app/_features/leads/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export const FormStatus = {
  EDIT: "edit",
  NEW: "new",
} as const;

export type FormStatusType = (typeof FormStatus)[keyof typeof FormStatus];

interface LeadAddModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Lead, "id">) => void;
  onEdit: (id: string, data: LeadAddFormValues) => void;
  formStatus: FormStatusType;
  lead?: Lead;
}

export const LeadAddModal = ({
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
    defaultValues: lead
      ? lead
      : {
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

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
        
          <label className="text-sm font-medium"> Enter name</label>

          <Input {...form.register("name")} placeholder="Name" />

         
        
         
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
          <label>Enter email</label>
          <Input
            {...form.register("email")}
            placeholder="Email"
            error={!!form.formState.errors.email}
            errorMessage={form.formState.errors.email?.message}
          />
          <label>Enter phone</label>
          <Input
            {...form.register("phone")}
            placeholder="Phone"
            error={!!form.formState.errors.phone}
            errorMessage={form.formState.errors.phone?.message}
          />

          <label>Enter company</label>
          <Input
            {...form.register("company")}
            placeholder="Company"
            error={!!form.formState.errors.company}
            errorMessage={form.formState.errors.company?.message}
          />
          <label>Status</label>

          <select
            {...form.register("status")}
            className="border-2 border-gray-500 rounded-xl p-2 w-full"
          >
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
          
          <Button type="submit" className="w-full  border rounded-xl p-4">
            {isNew ? "Create" : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>   
  )
}