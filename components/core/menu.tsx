"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  const LineComponent = () => {
    return (
      <>
        <div
          className={cn(
            "h-[1px] bg-[#d7d7d7]  -mx-5 my-5",
            isOpen ? "w-[116%]" : "w-[180%]"
          )}
        ></div>
      </>
    );
  };

  return (
    <div>
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className="w-full" key={index}>
              {groupLabel ? <LineComponent /> : null}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(
                                    isOpen === false ? "" : "mr-4",
                                    active ? "text-[#FE5209]" : "text-[#717171]"
                                  )}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    active
                                      ? "text-[#FE5209]"
                                      : "text-[#717171]",
                                    "max-w-[200px] truncate text-[16px] ",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      {/* <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      /> */}
                    </div>
                  )
              )}
              {groupLabel ? <LineComponent /> : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
