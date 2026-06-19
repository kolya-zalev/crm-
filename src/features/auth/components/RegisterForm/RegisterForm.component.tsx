"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/FormField/FormField.component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  schemaRegister,
  type RegisterFormValues,
} from "@/validators/auth.validators";
import type { RegisterFormProps } from "./RegisterForm.types";
import axios from "axios";

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();
  const [error, setError] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");

    try {
      await register(data);
      onSuccess?.();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Email already registered");
        return;
      }
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Create account</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            form={form}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            id="register-name"
          />
          <FormField
            form={form}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            id="register-email"
          />
          <FormField
            form={form}
            name="password"
            label="Password"
            placeholder="********"
            type="password"
            id="register-password"
          />
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create account"}
          </Button>
        </form>
      </CardContent>
      <div className="text-muted-foreground border-t px-4 py-4 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </div>
    </Card>
  );
};
