export const formatTags = (tags?: string[]) =>
  tags && tags.length > 0 ? tags.join(", ") : "—";
