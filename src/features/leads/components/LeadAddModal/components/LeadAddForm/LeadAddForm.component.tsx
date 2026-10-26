"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLeadAdd, LeadAddFormValues } from "@/validators";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadAddFormProps } from "./LeadAddForm.types";
import { FormSelect } from "@/components/FormSelect";
import { leadStatusOptions } from "./utils/leadStatusOptions";

export const LeadAddForm = ({
  isNew,
  defaultValues,
  onSubmit,
  onReset,
}: LeadAddFormProps) => {
  const form = useForm<LeadAddFormValues>({
    resolver: zodResolver(schemaLeadAdd),
    defaultValues,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
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
          <FieldDescription className="text-sm text-red-500">
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
          <FieldDescription className="text-sm text-red-500">
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
          <FieldDescription className="text-sm text-red-500">
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
          <FieldDescription className="text-sm text-red-500">
            {form.formState.errors.company.message}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="lead-status" className="text-sm font-medium">
          Status
        </FieldLabel>
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormSelect
              id="lead-status"
              value={field.value}
              onChange={field.onChange}
              options={leadStatusOptions}
            />
          )}
        />
      </Field>

      <Field>
        <FieldLabel className="text-sm font-medium">Notes</FieldLabel>
        <Input {...form.register("notes")} placeholder="Notes" />
      </Field>

      <Field>
        <FieldLabel className="text-sm font-medium">Source</FieldLabel>
        <Input {...form.register("source")} placeholder="Source" />
      </Field>

      <Button type="submit" className="mt-2 w-full">
        {isNew ? "Create" : "Update"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full"
        onClick={() => {
          form.reset();
          onReset();
        }}
      >
        Reset
      </Button>
    </form>
  );
};
