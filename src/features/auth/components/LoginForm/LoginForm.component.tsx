import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginFormProps } from "./LoginForm.types";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, LoginFormValues } from "@/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm({
  onSubmit,
  isLoading,
  error,
  className,
  ...props
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      <Card className="rounded-xl py-6 shadow-lg ring-foreground/15">
        <CardHeader className="px-6">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Welcome back!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!form.formState.errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <FieldError>{form.formState.errors.email.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!form.formState.errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  aria-invalid={!!form.formState.errors.password}
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <FieldError>
                    {form.formState.errors.password.message}
                  </FieldError>
                )}
              </Field>

              {error && <FieldError>{error}</FieldError>}

              <Field>
                <Button
                  type="submit"
                  className="w-full rounded-4xl"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Log in"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center bg-muted/50">
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
