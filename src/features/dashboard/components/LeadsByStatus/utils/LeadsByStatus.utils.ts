export const StatusBars = [
  { status: "new", label: "New", color: "bg-blue-500" },
  { status: "contacted", label: "Contacted", color: "bg-sky-500" },
  { status: "qualified", label: "Qualified", color: "bg-purple-500" },
  { status: "won", label: "Won", color: "bg-green-500" },
  { status: "lost", label: "Lost", color: "bg-red-500" },
] as const;

export const getStatusPercent = (count: number, total: number) =>
  total === 0 ? 0 : Math.round((count / total) * 100);
