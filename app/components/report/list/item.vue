<script setup lang="ts">
import type { Hex } from "#shared/types/common";
import type { Item } from "#shared/types/report";

defineProps<{
  item: Item;
}>();

const clipboard = useClipboard();
const { success } = useToast();

const copyCode = (hex: Hex) => {
  clipboard
    .copy(hex)
    .then(() => {
      success({
        title: "رنگ با موفقیت کپی شد",
      });
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};
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
      :title="
        'مشاهده‌ی ' + (item.title ? `رنگ‌های ${item.title}` : 'این رنگ‌ها')
      "
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
  @apply bg-rb-violet-100 rounded-lg p-4;
}
ul {
  @apply flex overflow-hidden rounded-lg border border-gray-200 h-40 -mt-8 mb-3 bg-gray-200 shadow-lg/7;
}
li {
  @apply grow w-1 h-full overflow-hidden;
  @apply hover:w-20;
}
code {
  @apply h-full flex justify-center items-center text-lg font-bold uppercase px-4 select-none opacity-0;
  @apply hover:opacity-100;
}

li,
code {
  @apply transition-all duration-200;
}
</style>
