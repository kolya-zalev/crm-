"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BuiltInViews, SavedViewsStorageKey } from "../savedViews.constants";
import type { SavedView } from "../savedViews.types";
import type { UseLeadsSavedViewsParams } from "./useLeadsSavedViews.types";

const loadCustomViews = (): SavedView[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(SavedViewsStorageKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (view): view is SavedView =>
        typeof view === "object" &&
        view !== null &&
        typeof view.id === "string" &&
        typeof view.name === "string" &&
        view.isBuiltIn === false &&
        typeof view.state === "object" &&
        view.state !== null,
    );
  } catch {
    return [];
  }
};

const persistCustomViews = (customViews: SavedView[]) => {
  localStorage.setItem(SavedViewsStorageKey, JSON.stringify(customViews));
};

export const useLeadsSavedViews = ({
  tableState,
  setTableState,
}: UseLeadsSavedViewsParams) => {
  const [customViews, setCustomViews] = useState<SavedView[]>([]);
  const [activeViewId, setActiveViewId] = useState<string | null>(null);

  useEffect(() => {
    setCustomViews(loadCustomViews());
  }, []);

  const allViews = useMemo(
    () => [...BuiltInViews, ...customViews],
    [customViews],
  );

  const applyView = useCallback(
    (id: string) => {
      const view = allViews.find((item) => item.id === id);
      if (!view) {
        return;
      }

      setTableState({
        ...view.state,
        visibleColumns: [...view.state.visibleColumns],
        page: 1,
      });
      setActiveViewId(id);
    },
    [allViews, setTableState],
  );

  const saveCurrentView = useCallback(
    (name: string) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return;
      }

      const { page: _page, ...state } = tableState;
      const newView: SavedView = {
        id: crypto.randomUUID(),
        name: trimmedName,
        isBuiltIn: false,
        state: {
          ...state,
          visibleColumns: [...state.visibleColumns],
        },
      };

      setCustomViews((prev) => {
        const updated = [...prev, newView];
        persistCustomViews(updated);
        return updated;
      });
      setActiveViewId(newView.id);
    },
    [tableState],
  );

  const deleteView = useCallback(
    (id: string) => {
      const view = customViews.find((item) => item.id === id);
      if (!view || view.isBuiltIn) {
        return;
      }

      setCustomViews((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        persistCustomViews(updated);
        return updated;
      });

      if (activeViewId === id) {
        setActiveViewId(null);
      }
    },
    [activeViewId, customViews],
  );

  const clearActiveView = useCallback(() => {
    setActiveViewId(null);
  }, []);

  return {
    allViews,
    activeViewId,
    applyView,
    saveCurrentView,
    deleteView,
    clearActiveView,
  };
};
