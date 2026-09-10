<script setup lang="ts">
import List from "./list.vue";
import Gradient from "./gradient.vue";
import Footer from "./footer/index.vue";
import Setting from "./setting.vue";

import Export from "./export/index.vue";
import ColorBlindness from "./colorBlindness/index.vue";
import Adjustment from "./adjustment/index.vue";

import { PALETTE_ASIDE_INSET_CLASS, PALETTE_ASIDE_MOTION_CLASS } from "~/consts/aside";

import type { DetailedColor } from "#shared/types/common";

const props = defineProps<{
  colors: DetailedColor[];
}>();

const paletteStore = usePaletteStore();

const { isIsolated, isGradient, originalColors, altColors, displayColors, isColorBlindMode } =
  storeToRefs(paletteStore);

watch(
  () => props.colors,
  (next) => {
    paletteStore.setOriginalColors(next);
  },
  { immediate: true },
);
</script>

<template>
  <div
    :class="[
      'flex h-screen flex-col transition-[padding-inline-end]',
      PALETTE_ASIDE_MOTION_CLASS,
      isColorBlindMode ? PALETTE_ASIDE_INSET_CLASS : 'pe-0',
    ]"
  >
    <div class="grow relative">
      <List
        v-model="originalColors"
        :alt-colors="altColors"
        :isolated="isIsolated"
      />

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
        <ColorBlindness class="flex-row-reverse" />
        <Adjustment class="flex-row-reverse" />
      </template>
    </Footer>
  </div>
</template>
