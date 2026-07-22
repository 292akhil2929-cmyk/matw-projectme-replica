"use client";

import { usePathname } from "next/navigation";
import { Footer, Header, InnerPage, TopDropdowns } from "../page";
import { AliBanatStoryPage, DonorQnaPage, SadaqahJariyahPage } from "../priority-pages";
import SadaqahWithCalculator from "../sadaqah-with-calculator";

export default function CatchAllPage() {
  const path = usePathname() || "/top-10";
  return <><Header /><TopDropdowns />{path === "/ali-banat" ? <AliBanatStoryPage /> : path === "/sadaqah-jariyah" ? <SadaqahWithCalculator /> : path === "/qna" || path.startsWith("/faq") ? <DonorQnaPage /> : <InnerPage path={path} />}<Footer /></>;
}
