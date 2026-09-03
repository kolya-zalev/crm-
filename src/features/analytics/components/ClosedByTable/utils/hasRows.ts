import { Analytics } from "@/types/analytics";

export const hasRows = (closedBy: Analytics["closedBy"]) => closedBy.length > 0;
