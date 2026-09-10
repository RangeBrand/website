import colorConvert from "color-convert";

import { isLight } from "./validations";

import type { DetailedColor, Hex } from "#shared/types/common";

export function toDetailedColor(hex: Hex): DetailedColor {
  const code = hex.replace("#", "");
  return {
    hex,
    rgb: colorConvert.hex.rgb(code),
    hsl: colorConvert.hex.hsl(code),
    isLight: isLight(hex),
  };
}
