"use client";

import { useCallback } from "react";
import { HomeCardsProps } from "./HomeCards.types";
import { HomeCardItem } from "./components/HomeCardItem/HomeCardItem.component";

export const HomeCardsComponent = ({ items }: HomeCardsProps) => {
  const renderCard = useCallback(
    (item: (typeof items)[number]) => (
      <HomeCardItem key={item.id} item={item} />
    ),
    [],
  );

  const renderListItems = useCallback(
    () => items.map(renderCard),
    [items, renderCard],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-6 px-5">
      {renderListItems()}
    </div>
  );
};
