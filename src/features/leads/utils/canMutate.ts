export const canMutateLeads = (role: string | undefined): boolean =>
  role === "admin" || role === "manager";
