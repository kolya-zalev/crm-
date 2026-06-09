"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavItem } from "@/utils/utils";
import { HomeCardsProps } from "./HomeCards.types";

export function HomeCardsComponent({ items }: HomeCardsProps) {
  const renderCard = useCallback(
    (item: NavItem) => (
      <Card
        className="relative w-full pt-0 font-mono mx-auto animate-in fade-in slide-in-from-bottom-8 duration-2000 fill-mode-forwards text-4xl font-bold rounded-xl"
        key={item.id}
      >
        <CardHeader>
          <CardTitle>{item.label}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={item.href} className="w-full">
            <Button className="w-full bg-purple-800 rounded-2xl hover:animate-bounce hover:scale-110 cursor-pointer">
              Open
            </Button>
          </Link>
        </CardFooter>
      </Card>
    ),
    [],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-6 px-5">
      {items.map(renderCard)}
    </div>
  );
}
