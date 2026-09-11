import color from "color"

import { isHex } from "./validations"

import type { ContrastGroup, ContrastStandard } from "#shared/types/contrast"

const GROUP_LIMITS: Record<ContrastGroup, { min: number; max: number }> = {
  "small-text": { min: 4.5, max: 7 },
  "large-text": { min: 3, max: 4.5 },
  "ui-component": { min: 3, max: 3 },
}

export function getContrastValue(background: string, text: string): number {
  if (!isHex(background) || !isHex(text)) return 0

  const ratio = color(background).contrast(color(text))
  return Math.round(ratio * 100) / 100
}

export function getContrastStandard(value: number, group: ContrastGroup): ContrastStandard {
  const { min, max } = GROUP_LIMITS[group]

  if (value < min) return "Poor"
  if (value < max) return "AA"
  return "AAA"
}
