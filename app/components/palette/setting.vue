<script setup lang="ts">
import Button from "./footer/action/button.vue";
import Dropdown from "./footer/action/dropdown.vue";

import type { DropdownItem } from "~/types/dropdown";

const paletteStore = usePaletteStore();

const { toggleIsolated, toggleGradient } = paletteStore;

const { isIsolated, isGradient } = storeToRefs(paletteStore);

const onIsolationToggle = () => {
  toggleIsolated();
  toggleGradient(false)
};

const onGradientToggle = () => {
  toggleGradient();
  toggleIsolated(false)
};

const dropdownItems = computed<DropdownItem[]>(() => [
  {
    label: `${isIsolated.value ? "پیوسته" : "جدا"} کردن رنگ‌ها`,
    onClick: onIsolationToggle,
  },
  {
    label: `${isGradient.value ? "مخفی کردن" : "نمایش"} گرادیانت`,
    onClick: onGradientToggle,
  },
  {
    label: "نمایش رنگ‌های مورد علاقه",
    onClick: () => alert("// TODO: show favorite colors"),
  },
]);
</script>

<template>
  <Dropdown position="top" :items="dropdownItems">
    <template #activator="{ on, isOpen }">
      <Button
        label="تنظیمات"
        title="باز کردن تنظیمات"
        icon="lucide:settings"
        v-on="on"
        v-bind="$attrs"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
      />
    </template>
  </Dropdown>
</template>
