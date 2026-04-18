<script setup lang="ts">
import type { Item } from "~/types/report";

defineProps<{
  item: Item;
}>();
</script>

<template>
  <div class="card">
    <ul>
      <li
        v-for="(color, index) in item.colors"
        :key="index"
        :style="{ backgroundColor: `#${color}` }"
      >
        <code dir="ltr">{{ color }}</code>
      </li>
    </ul>
    <NuxtLink
      :to="item.link"
      :title="
        'مشاهده‌ی ' + (item.title ? `رنگ‌های ${item.title}` : 'این رنگ‌ها')
      "
      rel="bookmark"
      class="link mr-4 font-bold"
      rb-link-variant="ghost"
    >
      {{ item.title }}
    </NuxtLink>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.card {
  @apply bg-rb-violet-100 rounded-lg p-4;
}
ul {
  @apply flex overflow-hidden rounded-lg border border-gray-200 h-32 -mt-8 mb-3 bg-gray-200 shadow-lg/7;
}
li {
  @apply grow w-1 h-full overflow-hidden;
  @apply hover:w-20;
}
code {
  @apply h-full flex justify-center items-center text-lg font-bold uppercase px-4 cursor-pointer select-none opacity-0;
  @apply hover:opacity-100;
}

li,
code {
  @apply transition-all duration-200;
}
</style>
