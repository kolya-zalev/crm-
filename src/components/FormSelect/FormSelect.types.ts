export type SelectOption = { value: string; label: string };

export type FormSelectProps = {
  id?: string;
  value: SelectOption["value"];
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  isInvalid?: boolean;
};
