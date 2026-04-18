<script setup lang="ts">
import { pick } from "lodash-es";
import Report from "~/components/report/index.vue";

import type { Brand } from "~/types/brand";
import type { Item } from "~/types/report";

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
    colors: ["0000ff", "ff00ff"],
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

const items = computed<Item[]>(() =>
  brands.map((brand) => ({
    ...pick(brand, ["title"]),
    id: brand.path.replace(/\//g, ""),
    link: `/brands${brand.path}`,
    colors: brand.colors.map((code) => ({
      hex: `#${code}`,
      isLight: isLight(`#${code}`),
    })),
  })),
);
</script>

<template>
  <Report :items />
</template>
