<script setup lang="ts">
import List from "./list.vue";
import Gradient from "./gradient.vue";
import Footer from "./footer/index.vue";
import Setting from "./setting.vue";

import Export from "./export/index.vue";
import ColorBlindness from "./colorBlindness/index.vue";
import Adjustment from "./adjustment/index.vue";
import Shades from "./shades/index.vue";

import { PALETTE_ASIDE_INSET_CLASS, PALETTE_ASIDE_MOTION_CLASS } from "~/consts/aside";
import { serializePaletteColors } from "~/utils/paletteQuery";

import type { DetailedColor } from "#shared/types/common";

const props = defineProps<{
  colors: DetailedColor[];
  shades?: boolean;
}>();

const paletteStore = usePaletteStore();

const {
  isIsolated,
  isGradient,
  isShadesVisible,
  originalColors,
  altColors,
  displayColors,
  isPaletteAsideOpen,
} = storeToRefs(paletteStore);

watch(
  () => props.colors,
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
</script>

<template>
  <div :class="[
    'flex h-screen flex-col transition-[padding-inline-end]',
    PALETTE_ASIDE_MOTION_CLASS,
    isPaletteAsideOpen ? PALETTE_ASIDE_INSET_CLASS : 'pe-0',
  ]">
    <div class="grow relative">
      <List v-model="originalColors" :alt-colors="altColors" :isolated="isIsolated" :show-shades="shades && isShadesVisible" />

      <Transition name="fade-in">
        <Gradient v-show="isGradient" :colors="displayColors" />
      </Transition>
    </div>
    <Footer class="grow-0">
      <template #right>
        <Setting />
        <Export :colors="originalColors" :original-colors="colors" />

      </template>
      <template #left>
        <Shades v-if="shades" />
        <ColorBlindness />
        <Adjustment />
      </template>
    </Footer>
  </div>
</template>
