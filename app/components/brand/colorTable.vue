<script setup lang="ts">
import type { DetailedColor } from "#shared/types/common"

defineProps<{
  colors: DetailedColor[]
}>()
</script>

<template>
  <div dir="ltr">
    <div class="flex rounded-lg bg-rb-violet-100 font-bold">
      <div class="w-1/3 px-3 py-2">رنگ</div>
      <div class="w-2/3 px-3 py-2">مقادیر</div>
    </div>
    <ul>
      <li v-for="color in colors" :key="color.hex" class="my-4 flex items-center">
        <div class="w-1/3">
          <NuxtLink
            class="block size-20 rounded-lg shadow"
            target="_blank"
            :title="`مشاهده‌ی رنگ ${color.hex} در پالت جداگانه`"
            :style="{ backgroundColor: color.hex }"
            :to="{
              path: '/palette',
              query: {
                colors: color.hex.replace('#', '').toLowerCase(),
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
