<script setup lang="ts">
import Header from "~/components/layout/header/index.vue";
import Main from "~/components/layout/main/index.vue";

withDefaults(
  defineProps<{
    wrapperClass?: string;
    wrapperTag?: any; // TODO: fix this
  }>(),
  {
    wrapperTag: Main,
  }
);
</script>

<template>
  <div>
    <Header />
    <component :is="wrapperTag" :class="wrapperClass">
      <slot />
    </component>
  </div>
</template>
