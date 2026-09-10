import blinder from "color-blind";

import type { ColorBlindnessType } from "#shared/types/colorBlindness";
import type { Hex } from "#shared/types/common";

export function simulateColorBlindness(
  hex: Hex,
  type: ColorBlindnessType,
): Hex {
  if (type === "normal") return hex;

  const simulated = blinder[type](hex);
  return (simulated.startsWith("#") ? simulated : `#${simulated}`) as Hex;
}
