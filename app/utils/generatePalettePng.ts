import type { DetailedColor } from "#shared/types/common";

const CANVAS = {
  height: 512,
  width: 1024,
} as const;

const LOGO = {
  size: 40,
  margin: 10,
  background: "#fcf8ff",
} as const;

const COLOR_FONT_SIZE = 20;
const FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

type PaletteSwatch = Pick<DetailedColor, "hex" | "isLight">;

function hexCode(hex: DetailedColor["hex"]): string {
  return hex.replace("#", "").toUpperCase();
}

function loadLogo(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load palette logo"));
    img.src = "/favicon.png";
  });
}

function drawColumn(
  context: CanvasRenderingContext2D,
  color: PaletteSwatch,
  colorWidth: number,
  index: number,
) {
  context.save();
  const startPoint = colorWidth * index;
  const code = hexCode(color.hex);

  context.fillStyle = color.hex;
  context.fillRect(
    startPoint,
    0,
    colorWidth,
    CANVAS.height - (LOGO.size + LOGO.margin * 2),
  );

  context.font = `bold ${COLOR_FONT_SIZE}px ${FONT}`;
  const textMetrics = context.measureText(code);
  context.textAlign = "center";
  context.translate(COLOR_FONT_SIZE / 2, textMetrics.width / 2);
  context.rotate(Math.PI / -2);
  context.fillStyle = color.isLight
    ? "rgba(0, 0, 0, 0.8)"
    : "rgba(255, 255, 255, 0.8)";
  context.fillText(
    code,
    textMetrics.width * 1.5 +
      (LOGO.size + LOGO.margin * 2) -
      CANVAS.height,
    startPoint + colorWidth * 0.5 - COLOR_FONT_SIZE / 2,
  );
  context.restore();
}

function drawLogo(
  context: CanvasRenderingContext2D,
  logo: HTMLImageElement,
  subtitle: string,
) {
  const logoFromTop = CANVAS.height - LOGO.size - LOGO.margin;
  const textFromLeft = LOGO.size + LOGO.margin * 2;

  context.drawImage(logo, LOGO.margin, logoFromTop, LOGO.size, LOGO.size);

  context.font = `${COLOR_FONT_SIZE}px ${FONT}`;
  context.fillStyle = "rgba(0, 0, 0, 0.8)";
  context.fillText("RangeBrand.ir", textFromLeft, logoFromTop + COLOR_FONT_SIZE / 1.25);

  context.font = `${COLOR_FONT_SIZE * 0.75}px ${FONT}`;
  context.fillStyle = "rgba(0, 0, 0, 0.5)";
  context.fillText(subtitle, textFromLeft, logoFromTop + COLOR_FONT_SIZE * 1.75);
}

export async function generatePalettePng(
  colors: PaletteSwatch[],
  subtitle: string,
): Promise<string> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is unavailable");
  }

  const swatches = colors.toReversed();
  const colorWidth = CANVAS.width / Math.max(swatches.length, 1);

  canvas.width = CANVAS.width;
  canvas.height = CANVAS.height;
  context.fillStyle = LOGO.background;
  context.fillRect(0, 0, CANVAS.width, CANVAS.height);

  swatches.forEach((color, index) => {
    drawColumn(context, color, colorWidth, index);
  });

  const logo = await loadLogo();
  drawLogo(context, logo, subtitle);

  const dataUrl = canvas.toDataURL("image/png");
  canvas.remove();
  return dataUrl;
}
