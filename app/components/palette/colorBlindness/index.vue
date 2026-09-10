<script setup lang="ts">
import Button from "../footer/action/button.vue";
import Aside from "~/components/layout/aside.vue";

import { COLOR_BLINDNESS_TYPES } from "~/consts/colorBlindness";

import type { ColorBlindnessType } from "#shared/types/colorBlindness";

const COLOR_BLINDNESS_ID = "palette-color-blindness";

const paletteStore = usePaletteStore();
const { altColors } = storeToRefs(paletteStore);

const selectedType = ref<ColorBlindnessType>("normal");

const [isOpen, toggle] = useHistorySyncedToggle(COLOR_BLINDNESS_ID);

watch(isOpen, (open) => {
  if (open) {
    selectedType.value = "normal";
    paletteStore.enterColorBlindMode();
    paletteStore.applyColorBlindness(selectedType.value);
    return;
  }
  paletteStore.exitColorBlindMode();
});

watch(selectedType, (type) => {
  if (!isOpen.value) return;
  paletteStore.applyColorBlindness(type);
});

const close = () => toggle(false);

const onTypeChange = (type: ColorBlindnessType, event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  selectedType.value = target.checked ? type : "normal";
};

const palettesTo = computed(() => ({
  path: "/palettes",
  query: {
    colors: altColors.value.map((color) => color.hex.replace("#", "")).join("-"),
  },
}));
</script>

<template>
  <div>
    <Button label="شبیه‌ساز کوررنگی" icon="lucide:glasses" title="شبیه‌ساز کوررنگی" :aria-expanded="isOpen"
      aria-haspopup="dialog" :aria-controls="COLOR_BLINDNESS_ID" @click="toggle()" />
    <Aside :is-open="isOpen" :aside-id="COLOR_BLINDNESS_ID" title="شبیه‌ساز کوررنگی" @close="close">
      <ul class="min-h-0 grow overflow-y-auto p-4 pb-24">
        <li v-for="blindness in COLOR_BLINDNESS_TYPES" :key="blindness.type">
          <label
            class="mb-2 flex w-full cursor-pointer items-center gap-3 rounded border border-black/10 bg-rb-violet-100 p-4 text-black/80 hover:bg-gray-100"
            :title="blindness.description || undefined">
            <input type="checkbox" class="size-4 shrink-0 accent-rb-violet-500"
              :checked="selectedType === blindness.type" @change="onTypeChange(blindness.type, $event)" />
            <span class="grow text-center">{{ blindness.name }}</span>
          </label>
        </li>
      </ul>
      <div class="absolute inset-x-0 bottom-0 pb-4 text-center">
        <NuxtLink :to="palettesTo" class="btn mx-1 inline-block" rb-btn-size="lg">
          اعمال
        </NuxtLink>
        <button type="button" class="btn mx-1" rb-btn-size="lg" rb-btn-variant="ghost" @click="close">
          بیخیال
        </button>
      </div>
    </Aside>
  </div>
</template>
