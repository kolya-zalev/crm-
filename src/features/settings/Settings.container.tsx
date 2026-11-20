"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/validators";
import { settingsApi } from "./api/settingsApi";
import { SettingsComponent } from "./Settings.component";

const errorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)
      ?.message;
    if (message) return message;
  }
  return "Please try again";
};

export const SettingsContainer = () => {
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSavePassword = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordFormValues) => {
    setIsPasswordSaving(true);
    try {
      await settingsApi.changePassword({ currentPassword, newPassword });
      passwordForm.reset();
      toast.success("Password updated");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <SettingsComponent
      isPasswordSaving={isPasswordSaving}
      onPasswordSubmit={passwordForm.handleSubmit(onSavePassword)}
      passwordRegister={passwordForm.register}
      currentPasswordError={
        passwordForm.formState.errors.currentPassword?.message
      }
      newPasswordError={passwordForm.formState.errors.newPassword?.message}
      confirmPasswordError={
        passwordForm.formState.errors.confirmPassword?.message
      }
    />
  );
};
