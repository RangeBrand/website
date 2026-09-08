import { pick } from "lodash-es";
import brands from "rangebrand/brands";

import type { ListResponse } from "#shared/types/api";
import type { Hex } from "#shared/types/common";
import type { Item } from "#shared/types/report";

export default defineEventHandler(async (): Promise<ListResponse<Item>> => {
  const items: Item[] = Object.values(brands).map((brand) => ({
    ...pick(brand, ["title"]),
    id: brand.id,
    link: `/brands/${brand.id}`,
    colors: brand.colors.map((code) => {
      const hex = code as Hex;
      return {
        hex,
        isLight: isLight(hex),
      };
    }),
  }));

  return {
    meta: {
      total_count: items.length,
      current_page: 1,
      page_size: 10,
    },
    items,
  };
});
