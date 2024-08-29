import {
  CircleDollarSign,
  Combine,
  HandCoins,
  LayoutDashboard,
  LucideIcon,
  TicketCheck,
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
          href: "/tournament/draft",
          label: "My Tournament",
          active: pathname.includes("/tournament"),
          icon: Combine,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "financial",
      menus: [
        {
          href: "/financial",
          label: "Financial",
          active: pathname === "/financial",
          icon: CircleDollarSign,
          submenus: [],
        },
        {
          href: "/team",
          label: "Organizing Team",
          active: pathname === "/team",
          icon: UsersRoundIcon,
          submenus: [],
        },
        {
          href: "/venus",
          label: "Venus",
          active: pathname === "/venus",
          icon: TicketCheck,
          submenus: [],
        },
        {
          href: "/sponsors",
          label: "Sponsors",
          active: pathname === "/sponsors",
          icon: HandCoins,
          submenus: [],
        },
      ],
    },
  ];
}
