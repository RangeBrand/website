<script setup lang="ts">
import ReportItem from "./item.vue"

import type { Item } from "#shared/types/report"

defineProps<{
  items: Item[]
}>()
</script>

<template>
  <ul class="3xl:grid-cols-6 grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    <li v-for="item in items" :key="item.id" class="pt-4">
      <ReportItem :item />
    </li>
  </ul>
</template>
