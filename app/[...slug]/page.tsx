"use client";

import { usePathname } from "next/navigation";
import { Footer, Header, InnerPage, TopDropdowns } from "../page";
import { AliBanatStoryPage, DonorQnaPage, SadaqahJariyahPage } from "../priority-pages";

export default function CatchAllPage() {
  const path = usePathname() || "/top-10";
  return <><Header /><TopDropdowns />{path === "/ali-banat" ? <AliBanatStoryPage /> : path === "/sadaqah-jariyah" ? <SadaqahJariyahPage /> : path === "/qna" || path.startsWith("/faq") ? <DonorQnaPage /> : <InnerPage path={path} />}<Footer /></>;
}
