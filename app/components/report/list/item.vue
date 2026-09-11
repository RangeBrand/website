<script setup lang="ts">
import type { Hex } from "#shared/types/common"
import type { Item } from "#shared/types/report"

defineProps<{
  item: Item
}>()

const clipboard = useClipboard()
const toast = useToast()

const copyCode = (hex: Hex) => {
  clipboard
    .copy(hex)
    .then(() => {
      toast.success({
        message: "کپی شد",
      })
    })
    .catch(() => {
      // TODO: let's see what's better UX
    })
}
</script>

<template>
  <div class="card">
    <ul>
      <li
        v-for="color in item.colors"
        :key="color.hex"
        :class="[color.isLight ? 'text-black/80' : 'text-white/80']"
        :style="{ backgroundColor: color.hex }"
      >
        <code
          dir="ltr"
          :class="[{ 'cursor-copy': clipboard.isSupported }]"
          @click="copyCode(color.hex)"
        >
          {{ color.hex.replace("#", "") }}
        </code>
      </li>
    </ul>
    <NuxtLink
      :to="item.link"
      :title="'مشاهده‌ی ' + (item.title ? `رنگ‌های ${item.title}` : 'این رنگ‌ها')"
      rel="bookmark"
      class="link mr-4 font-bold"
      rb-link-variant="ghost"
    >
      {{ item.title || "مشاهده" }}
    </NuxtLink>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.card {
  @apply rounded-lg bg-rb-violet-100 p-4;
}
ul {
  @apply -mt-8 mb-3 flex h-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-200 shadow-lg/7;
}
li {
  @apply h-full w-1 grow overflow-hidden;
  @apply hover:w-20;
}
code {
  @apply flex h-full items-center justify-center px-4 text-lg font-bold uppercase opacity-0 select-none;
  @apply hover:opacity-100;
}

li,
code {
  @apply transition-all duration-200;
}
</style>
