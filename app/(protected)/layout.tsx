"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/core/sidebar";
import { useSidebarToggle } from "@/hooks/slider/use-sidebar-toggle";
import { Navbar } from "@/components/core/navbar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarToggle();

  return (
    <>
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_68px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 p-8",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-[260px] "
        )}
      >
        {children}
      </main>
    </>
  );
}
