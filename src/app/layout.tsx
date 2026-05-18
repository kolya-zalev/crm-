import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Navbar from "@/components/layout/Navbar";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
    >
      <body className="h-full flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
