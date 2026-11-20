import type { FormEventHandler } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { UpdateEmailFormValues, UpdateNameFormValues } from "@/validators";

export type ProfileComponentProps = {
  isNameSaving: boolean;
  onNameSubmit: FormEventHandler<HTMLFormElement>;
  nameRegister: UseFormRegister<UpdateNameFormValues>;
  nameError?: string;
  isEmailSaving: boolean;
  emailLocked: boolean;
  emailLockLabel: string | null;
  onEmailSubmit: FormEventHandler<HTMLFormElement>;
  emailRegister: UseFormRegister<UpdateEmailFormValues>;
  emailError?: string;
};
