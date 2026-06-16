import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/FormField/FormField.component";
import { LeadStatusOptions } from "../../LeadAddModal.constants";
import { LeadAddFormProps } from "./LeadAddForm.types";

export const LeadAddForm = ({
  form,
  isNew,
  onSubmit,
  onReset,
}: LeadAddFormProps) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <FormField form={form} name="name" label="Enter name" placeholder="Name" id="lead-name" />
      <FormField form={form} name="email" label="Enter email" placeholder="Email" id="lead-email" />
      <FormField form={form} name="phone" label="Enter phone" placeholder="Phone" id="lead-phone" />
      <FormField form={form} name="company" label="Enter company" placeholder="Company" id="lead-company" />

      <Field>
        <FieldLabel className="text-sm font-medium">Status</FieldLabel>
        <select
          {...form.register("status")}
          className="border border-input rounded-none p-2 w-full text-xs bg-transparent transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 dark:bg-zinc-900"
        >
          {LeadStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
        className="w-full border rounded-xl p-4 mt-2 bg-green-800 cursor-pointer"
      >
        {isNew ? "Create" : "Update"}
      </Button>
      <Button
        type="button"
        onClick={onReset}
        className="w-50 mx-auto flex justify-center border rounded-xl p-4 mt-2 bg-red-800 cursor-pointer"
      >
        Reset
      </Button>
    </form>
  );
};
