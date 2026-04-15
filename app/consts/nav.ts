import type { NavItem } from "@/types/nav";

export const LINKS: NavItem[] = [
  {
    to: "/brands/",
    title: "برندها",
  },
  {
    to: "/colors/",
    title: "رنگ‌ها",
  },
  {
    title: "ابزارها",
    children: [
      {
        // to: "/contrast-checker",
        title: "محاسبه‌ی کنتراست",
      },
      {
        // to: "/color",
        title: "تبدیل RGB به HEX",
      },
      {
        // to: "/color-extractor/",
        title: "استخراج رنگ از عکس",
      },
    ],
  },
  {
    to: "/about/",
    title: "درباره‌ ما",
  },
];
