"use client";

import { LoginForm } from "./LoginForm.component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormValues } from "./LoginForm.types";
import { signIn } from "@/lib/auth-client";

export const LoginFormContainer = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);
    if (error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  );
};
