<script setup lang="ts">
import Search from "./search/index.vue";
import List from "./list/index.vue";
import Pagination from "./pagination/index.vue";

import type { ListMeta } from "#shared/types/api";
import type { Item } from "#shared/types/report";

const props = defineProps<{
  hideSearch?: boolean;
  hidePagination?: boolean;
  items: Item[];
  meta?: ListMeta;
}>();

const showPagination = computed(
  () =>
    !props.hidePagination &&
    !!props.meta &&
    props.meta.total_count > props.meta.page_size,
);
</script>
<template>
  <Search v-if="!hideSearch" />
  <List :items />
  <Pagination v-if="meta && showPagination" :meta="meta" />
</template>
