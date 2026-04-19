import { pick } from "lodash-es";

import type { Brand } from "#shared/types/brand";
import type { Response } from "#shared/types/api";
import type { Item } from "#shared/types/report";

// TODO: Make Dynamic using new dataset
const brands: Brand[] = [
  {
    title: "فلان",
    path: "/foo",
    colors: ["00ff00", "ff0000"],
    description: "",
    updated_at: "",
    tags: [],
  },
  {
    title: "بهمان",
    path: "/bar",
    colors: ["FECC00", "009FE3", "E30613"],
    description: "",
    updated_at: "",
    tags: [],
  },
  {
    title: "بهمان",
    path: "/bar2",
    colors: ["0000ff", "ff00ff"],
    description: "",
    updated_at: "",
    tags: [],
  },
  {
    title: "بهمان",
    path: "/bar3",
    colors: ["0000ff", "ff00ff"],
    description: "",
    updated_at: "",
    tags: [],
  },
  {
    title: "بهمان",
    path: "/bar4",
    colors: ["009FE3", "ff00ff"],
    description: "",
    updated_at: "",
    tags: [],
  },
  {
    title: "بهمان",
    path: "/bar5",
    colors: [
      "00000f",
      "0000f0",
      "000f00",
      "00f000",
      "0f0000",
      "f00000",
      "f000f0",
      "f00f00",
      "f0f000",
    ],
    description: "",
    updated_at: "",
    tags: [],
  },
];

export default defineEventHandler(async (): Promise<Response<Item>> => {
  const items: Item[] = brands.map((brand) => ({
    ...pick(brand, ["title"]),
    id: brand.path.replace(/\//g, ""),
    link: `/brands${brand.path}`,
    colors: brand.colors.map((code) => ({
      hex: `#${code}`, // TODO: remove # when using new dataset
      isLight: isLight(`#${code}`),
    })),
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
