<script setup lang="ts">
import Search from "./search/index.vue";
import List from "./list/index.vue";
import Pagination from "./pagination/index.vue";

import type { Item } from "~/types/report";

defineProps<{
  hideSearch?: boolean;
  hidePagination?: boolean;
  items: Item[];
}>();
</script>
<template>
  <Search v-if="!hideSearch" />
  <List :items />
  <Pagination v-if="!hidePagination" />
</template>
