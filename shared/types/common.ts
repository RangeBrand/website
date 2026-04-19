export type Id = string | undefined;

export type Hex = `#${string}`;

export type Color = {
  hex: Hex;
  isLight: boolean;
};
