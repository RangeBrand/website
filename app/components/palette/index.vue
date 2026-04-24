<!-- TODO: Make Buttons Work -->
<script setup lang="ts">
import List from "./list.vue";
import Footer from "./footer.vue";

defineProps<{
  colors: DetailedColor[];
}>();

const BASE_BTN_ATTRS = {
  class: "btn px-3 py-2",
  "rb-btn-variant": "ghost",
  "rb-btn-size": "sm",
  iconSize: 20,
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <List :colors="colors" />
    <Footer class="grow-0">
      <template #right>
        <button v-bind="BASE_BTN_ATTRS">
          <Icon name="lucide:settings" :size="BASE_BTN_ATTRS.iconSize" />
          تنظیمات
        </button>
        <button v-bind="BASE_BTN_ATTRS">
          <Icon name="lucide:share-2" :size="BASE_BTN_ATTRS.iconSize" />
          خروجی
        </button>
      </template>
      <template #left>
        <button v-bind="BASE_BTN_ATTRS">
          شبیه‌ساز کوررنگی
          <Icon name="lucide:glasses" :size="BASE_BTN_ATTRS.iconSize" />
        </button>
        <button v-bind="BASE_BTN_ATTRS">
          تنظیم رنگ‌ها
          <Icon name="lucide:settings-2" :size="BASE_BTN_ATTRS.iconSize" />
        </button>
      </template>
    </Footer>
  </div>
</template>
