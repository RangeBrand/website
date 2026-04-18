<script setup lang="ts">
import ReportItem from "./item.vue";

import type { Item } from "~/types/report";

defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul class="grid grid-cols-5 gap-4 py-4">
    <li v-for="item in items" :key="item.id" class="pt-4">
      <ReportItem :item />
    </li>
  </ul>
</template>
