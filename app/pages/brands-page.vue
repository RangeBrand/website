<script setup lang="ts">
import Report from "~/components/report/index.vue";
import { BRANDS_DESCRIPTION } from "#shared/seo";

definePageMeta({
  path: "/brands/:page(\\d+)",
});

const { items, meta, page } = await usePagedList("/api/brands");

if (page.value === 1) {
  await navigateTo("/brands", { redirectCode: 301, replace: true });
}

useSeoMeta({
  title: "برندها",
  description: BRANDS_DESCRIPTION,
  ogDescription: BRANDS_DESCRIPTION,
});
</script>

<template>
  <Report :items :meta hide-search />
</template>
