import { ChevronLeft, ListEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import hamburger from '@/public/icons/svg/hamburger.svg'
import Image from "next/image";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div
      className={cn(
        "flex justify-end bg-[#ffffff] text-[#000] -mx-3"
      )}
      style={{
        // borderTop: "1px solid #d7d7d7",
        // borderBottom: "1px solid #d7d7d7",
      }}
    >
      <Button
        onClick={() => setIsOpen?.()}
        className="bg-white text-[#000] hover:bg-inherit"
        size="icon"
      >
        <ListEnd
          className={cn(
            "h-5 w-5 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
        {/* <Image src={hamburger} width={80} height={80} alt="hamburger" /> */}
      </Button>
    </div>
  );
}
