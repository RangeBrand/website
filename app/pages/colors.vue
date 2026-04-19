<script setup lang="ts">
import Report from "~/components/report/index.vue";

const { data } = await useFetch("/api/palettes");

const items = computed(() => data.value?.items || []);
</script>

<template>
  <Report :items hide-search hide-pagination />
</template>
