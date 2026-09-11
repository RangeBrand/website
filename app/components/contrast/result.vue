<script setup lang="ts">
defineProps<{
  label: string
  standard: string
  stars: number
}>()
</script>

<template>
  <div class="rounded-lg bg-rb-violet-100 px-3 py-2" :title="standard">
    <div class="text-base font-semibold text-black/80">
      {{ label }}
    </div>
    <div dir="ltr" class="flex justify-center gap-2 px-2 pt-2">
      <Icon
        v-for="i in 3"
        :key="i"
        name="hugeicons:star"
        size="16"
        :class="i <= stars ? 'opacity-60' : 'opacity-10'"
        aria-hidden="true"
      />
    </div>
    <code class="block text-center text-lg font-bold opacity-80">
      {{ standard }}
    </code>
  </div>
</template>
