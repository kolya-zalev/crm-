import { LeadImport } from "@/validators/leadImport";

export const mapCsvLead = (raw: Record<string, string>): LeadImport => {
  const tagsRow = raw.tags?.trim() ?? "";

  return {
    name: raw.name?.trim() ?? "",
    email: raw.email?.trim() ?? "",
    company: raw.company?.trim() ?? "",
    status: (raw.status?.trim() || "new") as LeadImport["status"],
    phone: raw.phone?.trim() || "",
    tags: tagsRow
      ? tagsRow
          .split(";")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    notes: raw.notes?.trim() || undefined,
    source: raw.source?.trim() || undefined,
  };
};
