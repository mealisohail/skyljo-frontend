import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/core/menu";
import { SidebarToggle } from "@/components/core/sidebar-toggle";
import { useSidebarToggle } from "@/hooks/slider/use-sidebar-toggle";
import Image from "next/image";

import logo from "@/public/assets/logo.png";
import subLogo from "@/public/assets/subLogo.png";

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarToggle();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-[260px]",
        "bg-[#fff]"
      )}
    >
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        {/* <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-3",
            isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2 ">
            {isOpen ? (
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Logo"
                className="w-[60%]"
              />
            ) : (
              <Image src={subLogo} width={50} height={50} alt="Logo" />
            )}
          </Link>
        </Button> */}
        <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
