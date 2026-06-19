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
  schemaLogin,
  type LoginFormValues,
} from "@/validators/auth.validators";
import type { LoginFormProps } from "./LoginForm.types";

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");

    try {
      await login(data);
      onSuccess?.();
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
        <CardDescription>Sign in to your CRM account</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            form={form}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            id="login-email"
          />
          <FormField
            form={form}
            name="password"
            label="Password"
            placeholder="********"
            type="password"
            id="login-password"
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
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <div className="text-muted-foreground border-t px-4 py-4 text-center text-sm">
        No account?{" "}
        <Link
          href="/register"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Register
        </Link>
      </div>
    </Card>
  );
};
