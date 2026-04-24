<script setup lang="ts">
import type { DetailedColor } from "#shared/types/common";

const props = defineProps<{
  colors: DetailedColor[];
}>();
</script>

<template>
  <div dir="ltr">
    <div class="flex rounded-lg font-bold bg-rb-violet-100">
      <div class="w-1/3 px-3 py-2">رنگ</div>
      <div class="w-2/3 px-3 py-2">مقادیر</div>
    </div>
    <ul>
      <li
        v-for="color in colors"
        :key="color.hex"
        class="flex items-center my-4"
      >
        <div class="w-1/3">
          <NuxtLink
            class="size-20 rounded-lg shadow block"
            target="_blank"
            :title="`مشاهده‌ی رنگ ${color.hex} در پالت جداگانه`"
            :style="{ backgroundColor: color.hex }"
            :to="{
              path: '/palette',
              query: {
                colors: color.hex.replace('#', ''),
              },
            }"
          />
        </div>
        <div class="w-2/3">
          <dl class="font-mono">
            <dt>HEX</dt>
            <dd>{{ color.hex }}</dd>
            <dt>RGB</dt>
            <dd>{{ color.rgb.join(", ") }}</dd>
            <dt>HSL</dt>
            <dd>{{ color.hsl.join(", ") }}</dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

dt {
  @apply float-left mr-2;
}
dt::after {
  content: ":";
}
dd {
  @apply uppercase;
}
</style>
