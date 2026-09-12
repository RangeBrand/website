import type { Color, Hex } from "#shared/types/common"

export const PALETTE_PNG = {
  height: 512,
  width: 1024,
} as const

const LOGO = {
  size: 40,
  margin: 10,
  background: "#fcf8ff",
} as const

const COLOR_FONT_SIZE = 20
const FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

export type PaletteCanvasContext<TImage> = {
  fillStyle: unknown
  font: string
  textAlign: "center" | "end" | "left" | "right" | "start"
  save(): void
  restore(): void
  fillRect(x: number, y: number, width: number, height: number): void
  translate(x: number, y: number): void
  rotate(angle: number): void
  measureText(text: string): { width: number }
  fillText(text: string, x: number, y: number): void
  drawImage(image: TImage, dx: number, dy: number, dw: number, dh: number): void
}

function hexCode(hex: Hex): string {
  return hex.replace("#", "").toUpperCase()
}

function drawColumn<TImage>(
  context: PaletteCanvasContext<TImage>,
  color: Color,
  colorWidth: number,
  index: number,
) {
  context.save()
  const startPoint = colorWidth * index
  const code = hexCode(color.hex)

  context.fillStyle = color.hex
  context.fillRect(startPoint, 0, colorWidth, PALETTE_PNG.height - (LOGO.size + LOGO.margin * 2))

  context.font = `bold ${COLOR_FONT_SIZE}px ${FONT}`
  const textMetrics = context.measureText(code)
  context.textAlign = "center"
  context.translate(COLOR_FONT_SIZE / 2, textMetrics.width / 2)
  context.rotate(Math.PI / -2)
  context.fillStyle = color.isLight ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"
  context.fillText(
    code,
    textMetrics.width * 1.5 + (LOGO.size + LOGO.margin * 2) - PALETTE_PNG.height,
    startPoint + colorWidth * 0.5 - COLOR_FONT_SIZE / 2,
  )
  context.restore()
}

function drawLogo<TImage>(context: PaletteCanvasContext<TImage>, subtitle: string, logo?: TImage) {
  const logoFromTop = PALETTE_PNG.height - LOGO.size - LOGO.margin
  const textFromLeft = LOGO.size + LOGO.margin * 2

  if (logo) {
    context.drawImage(logo, LOGO.margin, logoFromTop, LOGO.size, LOGO.size)
  }

  context.font = `${COLOR_FONT_SIZE}px ${FONT}`
  context.fillStyle = "rgba(0, 0, 0, 0.8)"
  context.fillText("RangeBrand.ir", textFromLeft, logoFromTop + COLOR_FONT_SIZE / 1.25)

  context.font = `${COLOR_FONT_SIZE * 0.75}px ${FONT}`
  context.fillStyle = "rgba(0, 0, 0, 0.5)"
  context.fillText(subtitle, textFromLeft, logoFromTop + COLOR_FONT_SIZE * 1.75)
}

export function drawPaletteCanvas<TImage>(
  context: PaletteCanvasContext<TImage>,
  colors: Color[],
  subtitle: string,
  logo?: TImage,
): void {
  const swatches = colors.toReversed()
  const colorWidth = PALETTE_PNG.width / Math.max(swatches.length, 1)

  context.fillStyle = LOGO.background
  context.fillRect(0, 0, PALETTE_PNG.width, PALETTE_PNG.height)

  swatches.forEach((color, index) => {
    drawColumn(context, color, colorWidth, index)
  })

  drawLogo(context, subtitle, logo)
}
