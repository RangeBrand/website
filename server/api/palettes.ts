import palettes from "rangebrand/colors";

import { paginate } from "../utils/paginate";

import type { ListResponse } from "#shared/types/api";
import type { Hex } from "#shared/types/common";
import type { Item } from "#shared/types/report";

export default defineEventHandler((event): ListResponse<Item> => {
  const items: Item[] = Object.entries(palettes).map(([id, palette]) => ({
    id,
    link: `/palette?colors=${palette.colors.map((code) => code.replace("#", "")).join("-")}`,
    colors: palette.colors.map((code) => {
      const hex = code as Hex;
      return {
        hex,
        isLight: isLight(hex),
      };
    }),
  }));

  return paginate(event, items);
});
