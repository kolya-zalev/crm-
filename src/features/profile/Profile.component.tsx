"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { ProfileComponentProps } from "./Profile.types";

export const ProfileComponent = ({
  isNameSaving,
  onNameSubmit,
  nameRegister,
  nameError,
  isEmailSaving,
  emailLocked,
  emailLockLabel,
  onEmailSubmit,
  emailRegister,
  emailError,
}: ProfileComponentProps) => (
  <div className="mx-auto flex max-w-4xl flex-col gap-6">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onNameSubmit}>
            <FieldGroup>
              <Field data-invalid={Boolean(nameError)}>
                <FieldLabel htmlFor="profile-name">Name</FieldLabel>
                <Input
                  id="profile-name"
                  disabled={isNameSaving}
                  aria-invalid={Boolean(nameError)}
                  {...nameRegister("name")}
                />
                {nameError ? <FieldError>{nameError}</FieldError> : null}
              </Field>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  className="min-w-24"
                  disabled={isNameSaving}
                >
                  {isNameSaving ? <Spinner /> : null}
                  Save
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onEmailSubmit}>
            <FieldGroup>
              <Field data-invalid={Boolean(emailError)}>
                <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                <Input
                  id="profile-email"
                  type="email"
                  disabled={emailLocked || isEmailSaving}
                  aria-invalid={Boolean(emailError)}
                  {...emailRegister("email")}
                />
                {emailError ? <FieldError>{emailError}</FieldError> : null}
                {emailLockLabel ? (
                  <p className="text-sm text-muted-foreground">
                    {emailLockLabel}
                  </p>
                ) : null}
              </Field>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  className="min-w-24"
                  disabled={emailLocked || isEmailSaving}
                >
                  {isEmailSaving ? <Spinner /> : null}
                  Save
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);
