"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-full grid place-items-center">
      <div className="flex justify-center items-center flex-col gap-4">
        <h1>Landing Page!</h1>
        <Button onClick={() => router.push("/tournament/draft")}>
          Lets go to tournament !!
        </Button>
      </div>
    </div>
  );
};

export default Landing;
