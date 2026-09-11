import { paletteQueryString, type PaletteQueryRaw } from "~/utils/paletteQuery"

import { isHex } from "#shared/utils/validations"

import type { Hex } from "#shared/types/common"

export const DEFAULT_CONTRAST_TEXT = "#FFFFFF" as Hex
export const DEFAULT_CONTRAST_BACKGROUND = "#9529FF" as Hex

export type ContrastColors = {
  text: Hex
  background: Hex
}

function toHex(token: string | undefined): Hex | undefined {
  if (!token) return undefined
  const hex = `#${token.replace("#", "")}` as Hex
  if (!isHex(hex)) return undefined
  return hex.toUpperCase() as Hex
}

export function serializeContrastColors({ text, background }: ContrastColors): string {
  return `${text.replace("#", "").toLowerCase()}-${background.replace("#", "").toLowerCase()}`
}

export function parseContrastQuery(raw: PaletteQueryRaw): ContrastColors {
  const [textToken, backgroundToken] = paletteQueryString(raw)
    .split("-")
    .map((token) => token.trim().toLowerCase())

  return {
    text: toHex(textToken) ?? DEFAULT_CONTRAST_TEXT,
    background: toHex(backgroundToken) ?? DEFAULT_CONTRAST_BACKGROUND,
  }
}
