import { pick, sortBy } from "lodash-es";
import brands from "rangebrand/brands";

import { paginate } from "#server/utils/paginate";

import type { ListResponse } from "#shared/types/api";
import type { Hex } from "#shared/types/common";
import type { Item } from "#shared/types/report";

export default defineEventHandler((event): ListResponse<Item> => {
  const items: Item[] = sortBy(Object.values(brands), "title").map((brand) => ({
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

  return paginate(event, items);
});
