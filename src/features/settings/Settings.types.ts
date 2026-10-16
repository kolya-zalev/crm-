import type { FormEventHandler } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { ChangePasswordFormValues } from "@/validators";

export type SettingsComponentProps = {
  isPasswordSaving: boolean;
  onPasswordSubmit: FormEventHandler<HTMLFormElement>;
  passwordRegister: UseFormRegister<ChangePasswordFormValues>;
  currentPasswordError?: string;
  newPasswordError?: string;
  confirmPasswordError?: string;
};
