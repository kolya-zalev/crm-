import { LoginFormValues } from "@/validators";

export type { LoginFormValues };

export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void | Promise<void>;
  isLoading: boolean;
  error: string | null;
  className?: string;
}
