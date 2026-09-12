import brands from "rangebrand/brands"

import type { Hex } from "#shared/types/common"
import type { H3Event } from "#nuxt-scripts/h3"

export default defineEventHandler(async (event: H3Event): Promise<Buffer> => {
  const id = getRouterParam(event, "id")?.replace(/\.png$/i, "")
  const brand = brands[id as keyof typeof brands]

  if (!brand) {
    throw createError({
      statusCode: 404,
      statusMessage: "Brand not found",
    })
  }

  const colors = brand.colors.map((code) => {
    const hex = code as Hex
    return {
      hex,
      isLight: isLight(hex),
    }
  })

  setResponseHeader(event, "Content-Type", "image/png")
  return generatePalettePngBuffer(colors, `/brands/${id}`)
})
