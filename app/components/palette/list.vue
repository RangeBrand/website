<!-- TODO: Make Cols Move and Add Actions -->
<script setup lang="ts">
defineProps<{
  colors: DetailedColor[];
  isolated: boolean;
}>();
</script>

<template>
  <ul :data-isolated="isolated">
    <li
      v-for="color in colors"
      :key="color.hex"
      :class="[color.isLight ? 'text-black/80' : 'text-white/80']"
      :style="{ backgroundColor: color.hex }"
    >
      <code dir="ltr">
        {{ color.hex.replace("#", "") }}
      </code>
    </li>
  </ul>
</template>

<style scoped>
@reference "~/assets/css/main.css";

ul {
  @apply bg-white flex h-full uppercase transition-all duration-200 gap-0;

  &[data-isolated="true"] {
    @apply p-2 gap-2;
    & > li {
      @apply rounded-lg;
    }
  }
}

li {
  @apply grow flex items-end justify-center;
}

code {
  @apply block text-xl font-bold uppercase p-2 select-none;
}
</style>
