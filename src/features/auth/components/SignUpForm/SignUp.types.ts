import { SignupFormValues } from "@/validators";

export type { SignupFormValues };

export interface SignUpFormProps {
  onSubmit: (data: SignupFormValues) => void | Promise<void>;
  isLoading: boolean;
  error: string | null;
  className?: string;
}
