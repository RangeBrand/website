import type { HSL, RGB } from "color-convert";

export type Id = string | undefined;

export type Hex = `#${string}`;

export type Color = {
  hex: Hex;
  isLight: boolean;
};

export type DetailedColor = {
  hex: Hex;
  rgb: RGB;
  hsl: HSL;
  isLight: boolean;
};
