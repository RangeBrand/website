<!-- TODO: Make Setting Work -->
<script setup lang="ts">
import Button from "../footer/action/button.vue";
import Dropdown from "../footer/action/dropdown.vue";

// TODO: Add Type
const dropdownItems = [
  {
    label: "جدا کردن رنگ‌ها",
    to: "#",
  },
  {
    label: "نمایش گرادیانت",
    to: "#",
  },
  {
    label: "نمایش رنگ‌های مورد علاقه",
    to: "#",
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
