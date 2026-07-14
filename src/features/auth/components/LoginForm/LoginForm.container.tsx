"use client";

import { signIn } from "next-auth/react";
import { LoginForm } from "./LoginForm.component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormValues } from "./LoginForm.types";

export const LoginFormContainer = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    if (result?.error) {
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
