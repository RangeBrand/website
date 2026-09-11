<script setup lang="ts">
defineProps<{
  label: string
  icon: string
}>()
</script>

<template>
  <button class="btn p-1 md:px-3 md:py-2" rb-btn-variant="ghost" rb-btn-size="sm">
    <Icon :name="icon" :size="20" />
    <span class="hidden md:inline">{{ label }}</span>
  </button>
</template>
