import { nanoid } from "nanoid";

import type { Palette } from "#shared/types/palette";
import type { Response } from "#shared/types/api";
import type { Item } from "#shared/types/report";

// TODO: Make Dynamic using new dataset
const palettes: Palette[] = [
  {
    colors: ["fc85ae", "9e579d", "574b90", "303a52"],
  },
  {
    colors: ["16171d", "095af9", "ffffff"],
  },
  {
    colors: ["5bd1d7", "348498", "004d61", "ff502f"],
  },
  {
    colors: ["c00000", "de3c3c", "f7b32d"],
  },
];

export default defineEventHandler(async (): Promise<Response<Item>> => {
  const items: Item[] = palettes.map((palette, index) => ({
    id: nanoid(),
    link: `/colors/${palette.colors.join("-")}`,
    colors: palette.colors.map((code) => ({
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
