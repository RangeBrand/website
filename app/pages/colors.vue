<script setup lang="ts">
import Report from "~/components/report/index.vue";
import { COLORS_DESCRIPTION } from "#shared/seo";

const { data } = await useFetch("/api/palettes");

const items = computed(() => data.value?.items || []);

useSeoMeta({
  title: "رنگ‌ها",
  description: COLORS_DESCRIPTION,
  ogDescription: COLORS_DESCRIPTION,
});
</script>

<template>
  <Report :items hide-search hide-pagination />
</template>
