<script setup lang="ts">
import Report from "~/components/report/index.vue";
import { BRANDS_DESCRIPTION } from "#shared/seo";

const { data } = await useFetch("/api/brands");

const items = computed(() => data.value?.items || []);

useSeoMeta({
  title: "برندها",
  description: BRANDS_DESCRIPTION,
  ogDescription: BRANDS_DESCRIPTION,
});
</script>

<template>
  <Report :items hide-search hide-pagination />
</template>
