<!-- TODO: Make Cols Move and Add Actions -->
<script setup lang="ts">
defineProps<{
  colors: DetailedColor[];
}>();
</script>

<template>
  <ul class="bg-grey-200 flex h-full uppercase">
    <li
      v-for="color in colors"
      :key="color.hex"
      :class="[
        'grow flex justify-center items-end py-2',
        color.isLight ? 'text-black/80' : 'text-white/80',
      ]"
      :style="{ backgroundColor: color.hex }"
    >
      <code
        dir="ltr"
        class="block text-lg font-bold uppercase px-4 select-none"
      >
        {{ color.hex.replace("#", "") }}
      </code>
    </li>
  </ul>
</template>
