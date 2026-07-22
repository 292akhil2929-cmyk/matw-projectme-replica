"use client";

import { usePathname } from "next/navigation";
import { AliBanatPage, FaqSection, Footer, Header, InnerPage, TopDropdowns } from "../page";

export default function CatchAllPage() {
  const path = usePathname() || "/top-10";
  return <><Header /><TopDropdowns />{path === "/ali-banat" ? <AliBanatPage /> : path.startsWith("/faq") ? <FaqSection /> : <InnerPage path={path} />}<Footer /></>;
}
