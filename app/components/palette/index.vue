<!-- TODO: Make Buttons Work -->
<script setup lang="ts">
import Footer from "./footer.vue";

const baseFooterBtnAttrs = {
  class: "btn px-3 py-2",
  "rb-btn-variant": "ghost",
  "rb-btn-size": "sm",
  iconSize: 20,
};
</script>

<template>
  <div class="h-screen flex flex-col bg-red-500">
    <div class="grow">1</div>
    <Footer>
      <template #right>
        <button v-bind="baseFooterBtnAttrs">
          <Icon name="lucide:settings" :size="baseFooterBtnAttrs.iconSize" />
          تنظیمات
        </button>
        <button v-bind="baseFooterBtnAttrs">
          <Icon name="lucide:share-2" :size="baseFooterBtnAttrs.iconSize" />
          خروجی
        </button>
      </template>
      <template #left>
        <button v-bind="baseFooterBtnAttrs">
          شبیه‌ساز کوررنگی
          <Icon name="lucide:glasses" :size="baseFooterBtnAttrs.iconSize" />
        </button>
        <button v-bind="baseFooterBtnAttrs">
          تنظیم رنگ‌ها
          <Icon name="lucide:settings-2" :size="baseFooterBtnAttrs.iconSize" />
        </button>
      </template>
    </Footer>
  </div>
</template>
