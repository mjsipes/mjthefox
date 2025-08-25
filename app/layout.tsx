import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { InvertProvider } from "@/components/invert-provider";
import { InvertToggle } from "@/components/invert-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mjsipes Photography",
  description: "Professional photography portfolio showcasing worldly travels and special collections by Michael Sipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <InvertProvider>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b lg:sticky top-0 z-10 bg-background overflow-hidden">
                <div className="flex items-center gap-3 px-3">
                  <SidebarTrigger />
                  <ModeToggle />
                  <InvertToggle />
                  <div className="border-l border-border h-6 mx-2" />
                  <DynamicBreadcrumb />
                </div>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
          </InvertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
