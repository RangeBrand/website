<script setup lang="ts">
import { isEqual } from "lodash-es";
import Action from "./action.vue";
import type { DetailedColor } from "#shared/types/common";

const props = defineProps<{
  colors: DetailedColor[];
  originalColors: DetailedColor[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const route = useRoute();

const hexCodes = computed(() =>
  props.colors.map((color) => color.hex.replace("#", "")),
);

const isOriginalBrandPage = computed(() => {
  const path = route.path.replace(/\/$/, "").toLowerCase();
  if (path === "/palette") return false;
  const current = [...hexCodes.value].sort();
  const original = props.originalColors
    .map((color) => color.hex.replace("#", ""))
    .sort();
  return isEqual(current, original);
});

const downloadPng = async () => {
  const subtitle = isOriginalBrandPage.value
    ? route.fullPath
    : `/palette/?colors=${hexCodes.value.join("-")}`;
  const filename = isOriginalBrandPage.value
    ? `RangeBrand-${String(route.params.id)}.png`
    : `RangeBrand-${hexCodes.value.map((code) => code.toUpperCase()).join("_")}.png`;

  try {
    const href = await generatePalettePng(props.colors, subtitle);
    const download = document.createElement("a");
    download.href = href;
    download.download = filename;
    download.click();
    download.remove();
    emit("close");
  } catch {
    // TODO: let's see what's better UX
  }
};
</script>

<template>
  <Action label="دانلود PNG" icon="lucide:image" @click="downloadPng" />
</template>
