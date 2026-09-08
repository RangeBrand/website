import { pick, uniq } from "lodash-es";
import colorConvert from "color-convert";
import brands from "rangebrand/brands";

import { formatList } from "#shared/utils/intl";
import { Nationalities } from "#shared/enums/nationality";

import type { DetailResponse } from "#shared/types/api";
import type { Hex } from "#shared/types/common";
import type { H3Event } from "#nuxt-scripts/h3";

export default defineEventHandler(async (event: H3Event): Promise<DetailResponse> => {
  const id = getRouterParam(event, "id");
  const brand = brands[id as keyof typeof brands];

  if (!brand) {
    throw createError({
      statusCode: 404,
      statusMessage: "Brand not found",
    });
  }

  const nationality = brand.tags.reduce<Nationalities | undefined>(
    (result, tag) => {
      if (result) return result;
      const key = tag.toUpperCase() as keyof typeof Nationalities;
      return Nationalities[key];
    },
    undefined
  );

  const isClosed = brand.tags.some((tag) => tag.toLowerCase() === "closed");

  const colorNames = formatList(
    uniq(brand.colors.map((code) => colorConvert.hex.keyword(code))) // TODO: translate names to farsi
  );

  return {
    ...pick(brand, ["title"]),
    content: [
      brand.long_description ||
        `${brand.title} یک ${brand.description} ${nationality || ""} ${
          isClosed && "بود که همکنون به فعالیت خود پایان داده"
        } است.`,
      `${brand.title} از رنگ‌های ${colorNames} در هویت سازمانی خود استفاده می‌کند.`,
    ],
    colors: brand.colors.map((code) => {
      const hex = code as Hex;
      return {
        hex,
        rgb: colorConvert.hex.rgb(code),
        hsl: colorConvert.hex.hsl(code),
        isLight: isLight(hex),
      };
    }),
  };
});
