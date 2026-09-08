<script setup lang="ts">
import Action from "./action.vue";
import type { DetailedColor } from "#shared/types/common";

const props = withDefaults(
  defineProps<{
    colors: DetailedColor[];
    showSnippet?: boolean;
  }>(),
  {
    showSnippet: false,
  },
);

defineEmits<{
  open: [];
}>();

const clipboard = useClipboard();
const toast = useToast();

const snippet = computed(() => {
  const csv = `// CSV\n${props.colors.map((color) => color.hex).join(", ")}`;
  const array = `// Array\n[${props.colors.map((color) => `"${color.hex}"`).join(", ")}]`;
  const extArray = `// Extended Array\n[\n${props.colors
    .map((color) => {
      const hex = `\t"hex": "${color.hex}",`;
      const rgb = `\t"rgb": "rgb(${color.rgb.join(", ")})",`;
      const hsl = `\t"hsl": "hsl(${color.hsl.join(", ")})"`;
      return `\t{\n\t${hex}\n\t${rgb}\n\t${hsl}\n\t}`;
    })
    .join(",\n")}\n]`;
  return `${csv}\n\n${array}\n\n${extArray}`;
});

const copyCode = () => {
  clipboard
    .copy(snippet.value)
    .then(() => {
      toast.success({
        message: "کپی شد",
      });
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};
</script>

<template>
  <Action
    v-if="!showSnippet"
    label="نمایش Code"
    icon="lucide:code"
    @click="$emit('open')"
  />
  <div v-else class="p-4">
    <pre
      dir="ltr"
      :class="[
        'm-0 max-h-80 overflow-auto rounded-lg bg-gray-100 p-4 text-start text-sm',
        clipboard.isSupported ? 'cursor-copy select-none' : 'select-all',
      ]"
      title="کپی کد"
      @click="copyCode"
    ><code>{{ snippet }}</code></pre>
  </div>
</template>
