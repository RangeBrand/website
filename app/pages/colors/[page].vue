<script setup lang="ts">
import Report from "~/components/report/index.vue";
import { COLORS_DESCRIPTION } from "#shared/seo";

definePageMeta({
  validate: (route) => {
    const raw = route.params.page;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return typeof value === "string" && /^\d+$/.test(value) && Number(value) > 0;
  },
});

const { items, meta, page } = await usePagedList("/api/palettes");

if (page.value === 1) {
  await navigateTo("/colors", { redirectCode: 301, replace: true });
}

useSeoMeta({
  title: "رنگ‌ها",
  description: COLORS_DESCRIPTION,
  ogDescription: COLORS_DESCRIPTION,
});
</script>

<template>
  <Report :items :meta hide-search />
</template>
