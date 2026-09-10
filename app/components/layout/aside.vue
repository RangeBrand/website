<script setup lang="ts">
import {
  PALETTE_ASIDE_MOTION_CLASS,
  PALETTE_ASIDE_WIDTH_CLASS,
} from "~/consts/aside";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    asideId: string;
    title: string;
    widthClass?: string;
  }>(),
  {
    widthClass: PALETTE_ASIDE_WIDTH_CLASS,
  },
);

const emit = defineEmits<{
  close: [];
}>();

const panelEl = useTemplateRef("panelEl");
const titleId = computed(() => `${props.asideId}-title`);

onClickOutside(panelEl, (event) => {
  if (props.isOpen) {
    emit("close");
    event.stopPropagation();
  }
});
</script>

<template>
  <Teleport to="body">
    <aside :id="asideId" ref="panelEl" role="complementary" :aria-labelledby="titleId" :aria-hidden="!isOpen" :class="[
      'fixed inset-e-0 top-0 z-40 flex h-dvh flex-col border-s border-gray-200 bg-rb-violet-100 pt-16 shadow-xl transition-transform',
      PALETTE_ASIDE_MOTION_CLASS,
      widthClass,
      isOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
    ]">
      <div class="p-2 text-center">
        <span :id="titleId" class="p-4 inline-block text-lg text-rb-violet-500 border-b-2">
          {{ title }}
        </span>
      </div>
      <div class="relative flex min-h-0 grow flex-col">
        <slot />
      </div>
    </aside>
  </Teleport>
</template>
