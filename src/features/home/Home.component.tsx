"use client";

import { sidebarItems } from "@/utils/utils";
import { HomeCards } from "./components/HomeCards";

export function HomeComponent() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <h1 className="font-mono mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards text-4xl font-bold">
        Welcome to CRM
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed p-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards font-bold">
        Your central hub for managing client relationships, tracking leads, and
        analyzing team performance. Streamline your sales workflow, organize
        customer data, and drive growth — all from one powerful, intuitive
        dashboard.
      </p>
      <HomeCards items={sidebarItems} />
    </div>
  );
}
