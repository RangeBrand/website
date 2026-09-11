import type { ColorAdjustment } from "#shared/types/colorAdjustment"

export type AdjustmentField = {
  key: keyof ColorAdjustment
  label: string
  min: number
  max: number
}

export const ADJUSTMENT_FIELDS: AdjustmentField[] = [
  { key: "hue", label: "Hue", min: -180, max: 180 },
  { key: "sat", label: "Saturation", min: -100, max: 100 },
  { key: "lum", label: "Brightness", min: -100, max: 100 },
]
