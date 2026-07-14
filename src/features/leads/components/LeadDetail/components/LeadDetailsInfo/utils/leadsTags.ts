export const leadsTags = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return "—";
  return tags.join(", ");
};
