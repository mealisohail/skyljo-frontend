"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export function StyleTab() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split('/').pop()
  return (
    <Tabs
      defaultValue={path}
      onValueChange={(value) => router.push(`/tournament/${value}`)}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
