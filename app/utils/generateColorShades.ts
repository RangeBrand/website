import { clamp, uniqBy } from "lodash-es";
import colorConvert from "color-convert";

import { toDetailedColor } from "#shared/utils/toDetailedColor";

import type { DetailedColor, Hex } from "#shared/types/common";

const SHADES_COUNT = 11;
const SIDE_COUNT = Math.floor(SHADES_COUNT / 2);
const STEP_DIVISOR = Math.ceil(SHADES_COUNT / 2);

function shadeFromHsl(h: number, s: number, l: number): DetailedColor {
  const next = colorConvert.hsl.hex([h, s, clamp(l, 0, 100)]);
  return toDetailedColor(`#${next}` as Hex);
}

export function generateColorShades(color: DetailedColor): DetailedColor[] {
  const [h, s, l] = color.hsl;

  const lighten = Array.from({ length: SIDE_COUNT }, (_, index) =>
    shadeFromHsl(h, s, l + ((100 - l) / STEP_DIVISOR) * (index + 1)),
  ).reverse();

  const darken = Array.from({ length: SIDE_COUNT }, (_, index) =>
    shadeFromHsl(h, s, l + (l / STEP_DIVISOR) * -(index + 1)),
  );

  const variants = uniqBy([...lighten, ...darken], (item) =>
    item.hex.toUpperCase(),
  ).filter((item) => item.hex.toUpperCase() !== color.hex.toUpperCase());

  return [...variants, color];
}
