<script setup lang="ts">
import Report from "~/components/report/index.vue"
import { BRANDS_DESCRIPTION } from "#shared/seo"

const { items, meta } = await usePagedList("/api/brands")

useSeoMeta({
  title: "برندها",
  description: BRANDS_DESCRIPTION,
  ogDescription: BRANDS_DESCRIPTION,
})
</script>

<template>
  <Report :items :meta hide-search />
</template>
