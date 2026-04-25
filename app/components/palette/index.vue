<script setup lang="ts">
import List from "./list.vue";
import Gradient from "./gradient.vue";
import Footer from "./footer/index.vue";
import Setting from "./setting.vue";

import Export from "./export/index.vue";
import ColorBlindness from "./colorBlindness/index.vue";
import Adjustment from "./adjustment/index.vue";

defineProps<{
  colors: DetailedColor[];
}>();

const paletteStore = usePaletteStore();

const { isIsolated, isGradient } = storeToRefs(paletteStore);
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="grow relative">
      <List :colors :isolated="isIsolated" />

      <Transition name="fade-in">
        <Gradient v-show="isGradient" :colors />
      </Transition>
    </div>
    <Footer class="grow-0">
      <template #right>
        <Setting />
        <Export />
      </template>
      <template #left>
        <ColorBlindness class="flex-row-reverse" />
        <Adjustment class="flex-row-reverse" />
      </template>
    </Footer>
  </div>
</template>
