import color from "color";

import type { Hex } from "~~/shared/types/common";

export const isHex = (input: string): boolean => {
  const regex = /^\#[0-9A-F]{6}$/i;
  try {
    return regex.test(input.toUpperCase());
  } catch {
    return false;
  }
};

const isLightCache = new Map<Hex, boolean>();
export const isLight = (hex: Hex): boolean => {
  let result = isLightCache.get(hex);
  if (result !== undefined) {
    return result;
  }

  if (!isHex(hex)) return false;

  result = color(hex).isLight();

  isLightCache.set(hex, result);
  return result;
};
