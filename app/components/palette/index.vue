<script setup lang="ts">
import List from "./list.vue";
import Footer from "./footer/index.vue";
import Setting from "./setting/index.vue";
import Export from "./export/index.vue";
import ColorBlindness from "./colorBlindness/index.vue";
import Adjustment from "./adjustment/index.vue";

defineProps<{
  colors: DetailedColor[];
}>();
</script>

<template>
  <div class="h-screen flex flex-col">
    <List :colors="colors" />
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
