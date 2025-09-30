import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import AppProviders from "@/components/AppProviders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import ViewSource from "@/components/view-source";
import { generateMetadata } from "@/utils/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 relative">
              <div className="flex gap-3">
                <SidebarTrigger />
                <ViewSource />
              </div>
              {children}
            </main>
          </SidebarProvider>
          <Toaster
            duration={8000}
            position="top-center"
            richColors
            closeButton
            expand
            visibleToasts={3}
            toastOptions={{
              actionButtonStyle: {
                backgroundColor: "#4A90E2",
                color: "#FFFFFF",
                borderRadius: "4px",
                padding: "0.25rem 0.5rem",
              },
              style: {
                pointerEvents: "auto",
              },
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
