<script setup lang="ts">
import Report from "~/components/report/index.vue";
import { COLORS_DESCRIPTION } from "#shared/seo";

const { items, meta } = await usePagedList("/api/palettes");

useSeoMeta({
  title: "رنگ‌ها",
  description: COLORS_DESCRIPTION,
  ogDescription: COLORS_DESCRIPTION,
});
</script>

<template>
  <Report :items :meta hide-search />
</template>
