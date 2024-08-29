"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const MyTournament = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/tournament") {
      router.replace("/tournament/draft");
    }
  }, []);
  return <></>;
};

export default MyTournament;
