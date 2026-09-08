<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_NAME } from "#shared/seo";

useHead({
  titleTemplate: `%s - ${SITE_NAME}`,
  htmlAttrs: {
    class:
      "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-rb-violet-100",
  },
});

useSeoMeta({
  description: SITE_DESCRIPTION,
  ogDescription: SITE_DESCRIPTION,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
