
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
  lead?: Lead | null;
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
          <label className="text-sm font-medium"></label>
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="lead-name" className="text-sm font-medium">
              Enter name
            </FieldLabel>
            <Input
              id="lead-name"
              {...form.register("name")}
              placeholder="Name"
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <FieldDescription className="text-red-500 text-sm">
                {form.formState.errors.name.message}
              </FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="lead-email" className="text-sm font-medium">
              Enter email
            </FieldLabel>
            <Input
              id="lead-email"
              {...form.register("email")}
              placeholder="Email"
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email && (
              <FieldDescription className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.phone}>
            <FieldLabel htmlFor="lead-phone" className="text-sm font-medium">
              Enter phone
            </FieldLabel>
            <Input
              id="lead-phone"
              {...form.register("phone")}
              placeholder="Phone"
              aria-invalid={!!form.formState.errors.phone}
            />
            {form.formState.errors.phone && (
              <FieldDescription className="text-red-500 text-sm">
                {form.formState.errors.phone.message}
              </FieldDescription>
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.company}>
            <FieldLabel htmlFor="lead-company" className="text-sm font-medium">
              Enter company
            </FieldLabel>
            <Input
              id="lead-company"
              {...form.register("company")}
              placeholder="Company"
              aria-invalid={!!form.formState.errors.company}
            />
            {form.formState.errors.company && (
              <FieldDescription className="text-red-500 text-sm">
                {form.formState.errors.company.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium">Status</FieldLabel>
            <select
              {...form.register("status")}
              className="border border-input rounded-none p-2 w-full text-xs bg-transparent transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 dark:bg-zinc-900"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium">Notes</FieldLabel>
            <Input {...form.register("notes")} placeholder="Notes" />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium">Source</FieldLabel>
            <Input {...form.register("source")} placeholder="Source" />
          </Field>

          <Button
            type="submit"
            className="w-full border rounded-xl p-4 mt-2 bg-green-800 cursor-pointer "
          >
            {isNew ? "Create" : "Update"}
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            className="w-50 mx-auto flex justify-center border rounded-xl p-4 mt-2 bg-red-800  cursor-pointer"
          >
            Reset
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
