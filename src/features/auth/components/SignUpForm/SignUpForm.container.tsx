"use client";

import { useState } from "react";
import { SignUpForm } from "./SignUpForm.component";
import { useRouter } from "next/navigation";
import { SignupFormValues } from "@/validators";
import { signUp } from "@/lib/auth-client";

export function SignUpFormContainer() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: SignupFormValues) => {
    setError(null);
    setIsLoading(true);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
  
    });
    setIsLoading(false);
    if (error) {
      setError(
        error.status === 422
          ? "Email already in use"
          : "Could not create account. Try again.",
      );
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };
  return (
    <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  );
}
