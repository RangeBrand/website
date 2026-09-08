<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <li>
    <button
      type="button"
      class="cursor-pointer rounded-lg px-4 py-3 hover:bg-rb-violet-100"
      @click="$emit('click')"
    >
      <span class="mb-2 inline-flex rounded-full bg-gray-200 p-3">
        <Icon :name="icon" size="28" />
      </span>
      <span class="block">{{ label }}</span>
    </button>
  </li>
</template>
