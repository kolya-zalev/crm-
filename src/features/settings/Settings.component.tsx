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
import type { SettingsComponentProps } from "./Settings.types";

export const SettingsComponent = ({
  isPasswordSaving,
  onPasswordSubmit,
  passwordRegister,
  currentPasswordError,
  newPasswordError,
  confirmPasswordError,
}: SettingsComponentProps) => (
  <div className="mx-auto flex max-w-4xl flex-col gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onPasswordSubmit}>
          <FieldGroup>
            <Field data-invalid={Boolean(currentPasswordError)}>
              <FieldLabel htmlFor="settings-current-password">
                Current password
              </FieldLabel>
              <Input
                id="settings-current-password"
                type="password"
                disabled={isPasswordSaving}
                {...passwordRegister("currentPassword")}
              />
              {currentPasswordError ? (
                <FieldError>{currentPasswordError}</FieldError>
              ) : null}
            </Field>
            <Field data-invalid={Boolean(newPasswordError)}>
              <FieldLabel htmlFor="settings-new-password">
                New password
              </FieldLabel>
              <Input
                id="settings-new-password"
                type="password"
                disabled={isPasswordSaving}
                {...passwordRegister("newPassword")}
              />
              {newPasswordError ? (
                <FieldError>{newPasswordError}</FieldError>
              ) : null}
            </Field>
            <Field data-invalid={Boolean(confirmPasswordError)}>
              <FieldLabel htmlFor="settings-confirm-password">
                Confirm password
              </FieldLabel>
              <Input
                id="settings-confirm-password"
                type="password"
                disabled={isPasswordSaving}
                {...passwordRegister("confirmPassword")}
              />
              {confirmPasswordError ? (
                <FieldError>{confirmPasswordError}</FieldError>
              ) : null}
            </Field>
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="min-w-24"
                disabled={isPasswordSaving}
              >
                {isPasswordSaving ? <Spinner /> : null}
                Save
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
);
