import { clamp } from "lodash-es"
import colorConvert from "color-convert"

import { toDetailedColor } from "#shared/utils/toDetailedColor"

import type { ColorAdjustment } from "#shared/types/colorAdjustment"
import type { DetailedColor, Hex } from "#shared/types/common"

export function adjustColor(hex: Hex, adjustment: ColorAdjustment): DetailedColor {
  const code = hex.replace("#", "")
  const [h, s, l] = colorConvert.hex.hsl(code)
  const hue = (((h + adjustment.hue) % 360) + 360) % 360
  const sat = clamp(s + adjustment.sat, 0, 100)
  const lum = clamp(l + adjustment.lum, 0, 100)
  const next = colorConvert.hsl.hex([hue, sat, lum])
  return toDetailedColor(`#${next}` as Hex)
}
