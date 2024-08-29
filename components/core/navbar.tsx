"use client";

import { Bell, CircleHelp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

import pic from "@/public/assets/pic.jpg";

const NotificationComponent = () => {
  return (
    <>
      <Button
        className="rounded-md w-10 h-10 bg-[#F2F2F2]"
        variant="outline"
        size="icon"
      >
        <Bell fill="#222222" strokeWidth={1.75} className="h-5 w-5" />
      </Button>
    </>
  );
};

const HelpComponent = () => {
  return (
    <>
      <Button
        className="rounded-md w-10 h-10 bg-[#F2F2F2] "
        variant="outline"
        size="icon"
      >
        <CircleHelp  fill="#222222" strokeWidth={1.75} className="h-6 w-6  text-[#fff]" />
      </Button>
    </>
  );
};

const UserComponent = () => {
  return (
    <>
      <Button
        className="rounded-xl px-3 py-[1.30rem] flex justify-between items-center"
        variant="outline"
      >
        <div className="rounded-md">
          <Image
            src={pic}
            width={30}
            height={30}
            alt="profile pic"
            className="rounded-md"
          />
        </div>{" "}
        <div className="flex flex-col justify-center items-start ml-3 mt-2">
          <div className="font-medium text-sm" style={{ lineHeight: 0.8 }}>
            User Name
          </div>
          <div className="text-[#8B8B8B] text-[12px]">Role </div>
        </div>
      </Button>
    </>
  );
};

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-[68px] items-center">
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <NotificationComponent />
          <HelpComponent />
          <UserComponent />
        </div>
      </div>
    </header>
  );
}
