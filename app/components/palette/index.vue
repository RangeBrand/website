<script setup lang="ts">
import List from "./list.vue";
import Gradient from "./gradient.vue";
import Footer from "./footer/index.vue";
import Setting from "./setting.vue";

import Export from "./export/index.vue";
import ColorBlindness from "./colorBlindness/index.vue";
import Adjustment from "./adjustment/index.vue";

const props = defineProps<{
  colors: DetailedColor[];
}>();

const localColors = ref<DetailedColor[]>([]);

watch(
  () => props.colors,
  (next) => {
    localColors.value = [...next];
  },
  { immediate: true },
);

const paletteStore = usePaletteStore();

const { isIsolated, isGradient } = storeToRefs(paletteStore);
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="grow relative">
      <List v-model="localColors" :isolated="isIsolated" />

      <Transition name="fade-in">
        <Gradient v-show="isGradient" :colors="localColors" />
      </Transition>
    </div>
    <Footer class="grow-0">
      <template #right>
        <Setting />
        <Export :colors="localColors" :original-colors="colors" />
      </template>
      <template #left>
        <ColorBlindness class="flex-row-reverse" />
        <Adjustment class="flex-row-reverse" />
      </template>
    </Footer>
  </div>
</template>
