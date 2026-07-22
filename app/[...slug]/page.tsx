"use client";

import { usePathname } from "next/navigation";
import { Footer, Header, InnerPage } from "../page";

export default function CatchAllPage() {
  const path = usePathname() || "/top-10";
  return <><Header /><InnerPage path={path} /><Footer /></>;
}
