"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { SignUpForm } from "./SignUpForm.component";
import { useRouter } from "next/navigation";
import { SignupFormValues } from "@/validators";
import { authApi } from "@/features/auth/api/authApi";
import { isAxiosError } from "axios";

export function SignUpFormContainer() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: SignupFormValues) => {
    setError(null);
    setIsLoading(true);
    try {
      await authApi.register(data);
      const result = await signIn("credentials", {
        name: data.name,
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Account created, Please login to continue.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        setError("Email already in use");
        return;
      }
      setError("Could not create account. Try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  );
}
