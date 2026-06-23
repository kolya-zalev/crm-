"use client";

import type { ReactNode } from "react";
import type { Activity } from "@/types";
import { Star, RefreshCw, NotebookPen, Trash, Pencil } from "lucide-react";

export const activityIcons: Record<Activity["type"], ReactNode> = {
  lead_created: <Star className="size-4 text-yellow-500" />,
  status_changed: <RefreshCw className="size-4 text-blue-500" />,
  note_added: <NotebookPen className="size-4 text-green-500" />,
  note_deleted: <Trash className="size-4 text-red-500" />,
  lead_updated: <Pencil className="size-4 text-purple-500" />,
};
