import {
  CircleDollarSign,
  Combine,
  FileCog,
  HandCoins,
  LayoutDashboard,
  LucideIcon,
  Settings,
  TicketCheck,
  Users,
  UsersRoundIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutDashboard,
          submenus: [],
        },
        {
          href: "/snipping",
          label: "Contractor Snipping",
          active: pathname.includes("/snipping"),
          icon: Combine,
          submenus: [],
        },
        {
          href: "/snipping/workers",
          label: "Worker Snipping",
          active: pathname.includes("/snipping/workers"),
          icon: FileCog,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
        {
          href: "/contractors",
          label: "Contractors",
          active: pathname.includes("/contractors"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}
