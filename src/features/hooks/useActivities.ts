import { useState, useEffect } from "react";
import {Activity} from "@/hooks/types";

export function useActivities(leadId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leads/${leadId}/activities`)
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
