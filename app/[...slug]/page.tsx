"use client";

import { usePathname } from "next/navigation";
import { Footer, Header, InnerPage, MegaNav } from "../page";

export default function CatchAllPage() {
  const path = usePathname() || "/top-10";
  return <><Header /><MegaNav /><InnerPage path={path} /><Footer /></>;
}
