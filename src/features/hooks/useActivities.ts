import { useState, useEffect } from "react";
import {Activity} from "@/hooks/types";

export function useActivities(leadId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

  useEffect(() => {
    fetch(`${BASE}/api/leads/${leadId}/activities`)
      .then((r) => r.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((err) => console.error(err))
      
      .finally(() => setIsLoading(false));
  }, [leadId]);

  

  return { activities, isLoading }
;
}
