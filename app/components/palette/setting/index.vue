<!-- TODO: Make Setting Work -->
<script setup lang="ts">
import type { DropdownItem } from "~/types/dropdown";
import Button from "../footer/action/button.vue";
import Dropdown from "../footer/action/dropdown.vue";

const dropdownItems: DropdownItem[] = [
  {
    label: "جدا کردن رنگ‌ها",
    onClick: () => console.log("s"),
  },
  {
    label: "نمایش گرادیانت",
    onClick: () => console.log("s"),
  },
  {
    label: "نمایش رنگ‌های مورد علاقه",
    onClick: () => console.log("s"),
  },
];
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
