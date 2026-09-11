<script setup lang="ts">
import Palette from "~/components/palette/index.vue";

import {
  paletteQueryString,
  parsePaletteColorsQuery,
  serializePaletteColors,
} from "~/utils/paletteQuery";

definePageMeta({
  middleware: "brand-detail-layout",
});

const route = useRoute();
const router = useRouter();
const paletteStore = usePaletteStore();
const { originalColors } = storeToRefs(paletteStore);

const fromQuery = computed(() => parsePaletteColorsQuery(route.query.colors));

watch(
  fromQuery,
  (next) => {
    if (
      serializePaletteColors(next) ===
      serializePaletteColors(originalColors.value)
    ) {
      return;
    }
    paletteStore.setOriginalColors(next);
  },
  { immediate: true },
);

watch(
  originalColors,
  (colors) => {
    if (!import.meta.client) return;
    const next = serializePaletteColors(colors);
    if (next === paletteQueryString(route.query.colors)) return;
    const query = { ...route.query };
    if (next) {
      query.colors = next;
    } else {
      delete query.colors;
    }
    void router.replace({ path: "/palette", query });
  },
  { deep: true },
);

useSeoMeta({
  title: "پالت رنگ",
});
</script>

<template>
  <Palette :colors="fromQuery" shades class="h-[calc(100dvh-4rem)]!" />
</template>
