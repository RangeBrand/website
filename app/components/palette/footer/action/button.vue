<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();
</script>
<template>
  <button class="btn px-3 py-2" rb-btn-variant="ghost" rb-btn-size="sm">
    <Icon :name="icon" :size="20" />
    {{ label }}
  </button>
</template>
