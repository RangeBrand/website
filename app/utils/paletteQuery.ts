import { uniq } from "lodash-es";

import { toDetailedColor } from "#shared/utils/toDetailedColor";
import { isHex } from "#shared/utils/validations";

import type { DetailedColor, Hex } from "#shared/types/common";

export type PaletteQueryRaw =
  | string
  | null
  | undefined
  | Array<string | null | undefined>;

export function paletteQueryString(raw: PaletteQueryRaw): string {
  if (Array.isArray(raw)) {
    return raw.filter((part): part is string => typeof part === "string").join("-");
  }
  return raw ?? "";
}

export function serializePaletteColors(
  colors: Pick<DetailedColor, "hex">[],
): string {
  return colors.map((color) => color.hex.replace("#", "").toLowerCase()).join("-");
}

export function parsePaletteColorsQuery(raw: PaletteQueryRaw): DetailedColor[] {
  const tokens = uniq(
    paletteQueryString(raw)
      .split("-")
      .map((token) => token.trim().replace("#", "").toLowerCase())
      .filter(Boolean),
  );

  return tokens.flatMap((token) => {
    const hex = `#${token}` as Hex;
    if (!isHex(hex)) return [];
    return [toDetailedColor(hex)];
  });
}
