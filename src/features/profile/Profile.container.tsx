"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  updateEmailSchema,
  updateNameSchema,
  type UpdateEmailFormValues,
  type UpdateNameFormValues,
} from "@/validators";
import { profileApi } from "./api/profileApi";
import { ProfileComponent } from "./Profile.component";

const profileQueryKey = ["profile", "me"] as const;

const errorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)
      ?.message;
    if (message) return message;
  }
  return "Please try again";
};

export const ProfileContainer = () => {
  const queryClient = useQueryClient();
  const { update } = useSession();
  const {
    data: me,
    isPending,
    isError,
  } = useQuery({
    queryKey: profileQueryKey,
    queryFn: profileApi.getMe,
  });

  const [isNameSaving, setIsNameSaving] = useState(false);
  const [isEmailSaving, setIsEmailSaving] = useState(false);

  const nameForm = useForm<UpdateNameFormValues>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: "" },
  });
  const emailForm = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: "" },
  });
  useEffect(() => {
    if (!me) return;
    nameForm.reset({ name: me.name });
    emailForm.reset({ email: me.email });
  }, [me, nameForm, emailForm]);

  const onSaveName = async ({ name }: UpdateNameFormValues) => {
    setIsNameSaving(true);
    try {
      const next = await profileApi.updateMe({ name });
      await update({ name: next.name });
      queryClient.setQueryData(profileQueryKey, next);
      toast.success("Name updated");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setIsNameSaving(false);
    }
  };

  const onSaveEmail = async ({ email }: UpdateEmailFormValues) => {
    setIsEmailSaving(true);
    try {
      const next = await profileApi.updateMe({ email });
      await update({ email: next.email });
      queryClient.setQueryData(profileQueryKey, next);
      toast.success("Email updated");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setIsEmailSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError || !me) {
    return <div>Failed to load profile</div>;
  }

  const emailLocked = Boolean(me.nextEmailChangeAt);
  const emailLockLabel = me.nextEmailChangeAt
    ? `Email can be changed again on ${new Date(me.nextEmailChangeAt).toLocaleDateString()}`
    : null;

  return (
    <ProfileComponent
      isNameSaving={isNameSaving}
      onNameSubmit={nameForm.handleSubmit(onSaveName)}
      nameRegister={nameForm.register}
      nameError={nameForm.formState.errors.name?.message}
      isEmailSaving={isEmailSaving}
      emailLocked={emailLocked}
      emailLockLabel={emailLockLabel}
      onEmailSubmit={emailForm.handleSubmit(onSaveEmail)}
      emailRegister={emailForm.register}
      emailError={emailForm.formState.errors.email?.message}
    />
  );
};
