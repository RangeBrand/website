import { existsSync } from "node:fs"
import { join } from "node:path"
import { createCanvas, loadImage } from "@napi-rs/canvas"

import { drawPaletteCanvas, PALETTE_PNG } from "#shared/utils/drawPaletteCanvas"

import type { Color } from "#shared/types/common"

async function loadLogo() {
  const logoPath = join(process.cwd(), "public", "favicon.png")
  if (!existsSync(logoPath)) {
    return undefined
  }

  return loadImage(logoPath)
}

export async function generatePalettePngBuffer(colors: Color[], subtitle: string): Promise<Buffer> {
  const canvas = createCanvas(PALETTE_PNG.width, PALETTE_PNG.height)
  const context = canvas.getContext("2d")
  const logo = await loadLogo()

  drawPaletteCanvas(context, colors, subtitle, logo)

  return canvas.toBuffer("image/png")
}
