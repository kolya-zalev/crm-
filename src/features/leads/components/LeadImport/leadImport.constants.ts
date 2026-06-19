export const LeadImportColumns = [
    "name",
    "email",
    "phone",
    "company",
    "status",
    "tags",
    "notes",
    "source",
] as const;

export const LeadImportRequiredColumns = [
    "name",
    "email",
    "company",
    "status",
] as const;

export const LeadImportStatusValues = [
    "new",
    "contacted",
    "qualified",
    "won",
    "lost",
] as const;

export const MaxImportRows = 100;
export const LeadImportTagsSeparator = ",";