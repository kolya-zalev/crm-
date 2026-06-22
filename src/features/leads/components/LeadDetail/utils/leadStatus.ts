export const LeadStatuses = [
  "new",
  "contacted",
  "qualified",
  "won",
] as const;

export function getCurrentStatusIndex(status: string): number {
  const index = LeadStatuses.indexOf(
    status as (typeof LeadStatuses)[number],
  );
  return index >= 0 ? index + 1 : 1;
}
