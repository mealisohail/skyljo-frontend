"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StyleTab } from "@/components/core/style-tab";
import { SelectComponent } from "@/components/core/select-component";
import { SearchBar } from "@/components/core/search-bar";

const AddButton = () => {
  return (
    <Button
      variant="orange"
      className="flex justify-between gap-2 items-center"
    >
      <Plus className="h-4 w-4 font-bold" />
      <p>NEW TOURNAMENT</p>
    </Button>
  );
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>My Tournament</h1>

      <div className="flex justify-between items-center flex-1 gap-3 py-4">
        <StyleTab />
        <SelectComponent />
        <SearchBar />
        <AddButton />
      </div>
      
      <main
        className={cn(
          "bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 pt-8 h-full"
        )}
      >
        {children}
      </main>
    </>
  );
}
