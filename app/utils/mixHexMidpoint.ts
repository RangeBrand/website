import colorConvert from "color-convert"

import type { Hex } from "#shared/types/common"

export function mixHexMidpoint(a: Hex, b: Hex): Hex {
  const left = colorConvert.hex.rgb(a.replace("#", ""))
  const right = colorConvert.hex.rgb(b.replace("#", ""))
  const mixed: [number, number, number] = [
    Math.round((left[0] + right[0]) / 2),
    Math.round((left[1] + right[1]) / 2),
    Math.round((left[2] + right[2]) / 2),
  ]
  return `#${colorConvert.rgb.hex(mixed)}` as Hex
}
