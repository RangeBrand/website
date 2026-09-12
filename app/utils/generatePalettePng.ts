import { drawPaletteCanvas, PALETTE_PNG } from "#shared/utils/drawPaletteCanvas"

import type { Color } from "#shared/types/common"

function loadLogo(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load palette logo"))
    img.src = "/favicon.png"
  })
}

export async function generatePalettePng(colors: Color[], subtitle: string): Promise<string> {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas 2D context is unavailable")
  }

  canvas.width = PALETTE_PNG.width
  canvas.height = PALETTE_PNG.height

  const logo = await loadLogo()
  drawPaletteCanvas(context, colors, subtitle, logo)

  const dataUrl = canvas.toDataURL("image/png")
  canvas.remove()
  return dataUrl
}
