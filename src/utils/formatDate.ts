export const formatDateTime = (date: string) =>
  new Date(date).toLocaleString();

export const formatDueDate = (date: string) =>
  new Date(date).toLocaleDateString();

export const formatDateForInput = (date: string) =>
  date ? new Date(date).toISOString().split("T")[0] : "";
