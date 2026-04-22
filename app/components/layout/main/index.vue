<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    defaultClass?: string;
    tag?: string;
  }>(),
  {
    defaultClass: "container mx-auto col gap-y-4 py-8 px-3 sm:px-0",
    tag: "main",
  }
);
</script>
<template>
  <component
    :is="tag"
    v-bind="{
      ...$attrs,
      class: [$attrs.class, defaultClass],
    }"
  >
    <slot />
  </component>
</template>
