"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Navbar from "@/components/layout/Navbar";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}