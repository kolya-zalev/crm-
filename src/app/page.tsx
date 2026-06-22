"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { sidebarItems } from "@/utils/utils";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans dark:bg-black">
      <h1 className="font-mono mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards text-4xl font-bold">
        Welcome to CRM
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed p-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards  font-bold">
        Your central hub for managing client relationships, tracking leads, and
        analyzing team performance. Streamline your sales workflow, organize
        customer data, and drive growth — all from one powerful, intuitive
        dashboard.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-6 px-5">
        {sidebarItems.map((item) => (
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
                <Button className="w-full bg-purple-800 rounded-2xl hover:animate-bounce  hover:scale-110 cursor-pointer">
                  Open
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
