import type { ContrastGroup, ContrastStandard } from "#shared/types/contrast"

export const CONTRAST_RESULT_ITEMS: { id: ContrastGroup; label: string }[] = [
  {
    id: "small-text",
    label: "نوشته‌های معمولی",
  },
  {
    id: "large-text",
    label: "نوشته‌های بزرگ",
  },
  {
    id: "ui-component",
    label: "کامپوننت‌های UI",
  },
]

export const CONTRAST_STANDARD_STARS: Record<ContrastStandard, number> = {
  Poor: 1,
  AA: 2,
  AAA: 3,
}
