export type MessageInputProps = {
  onSend: (text: string) => Promise<void>;
  isSending: boolean;
};

export type MessageInputComponentProps = {
  text: string;
  setText: (value: string) => void;
  isSending: boolean;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
