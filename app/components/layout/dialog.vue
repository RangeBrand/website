<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    dialogId: string;
    title: string;
    showBack?: boolean;
  }>(),
  {
    showBack: false,
  },
);

const emit = defineEmits<{
  close: [];
  back: [];
}>();

const panelEl = useTemplateRef("panelEl");
const titleId = computed(() => `${props.dialogId}-title`);

onClickOutside(panelEl, (event) => {
  if (props.isOpen) {
    emit("close");
    event.stopPropagation();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-in">
      <div
        v-show="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-xs"
      >
        <div
          :id="dialogId"
          ref="panelEl"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          class="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div
            class="relative flex items-center border-b border-black/10 p-2 text-center text-lg font-bold text-rb-violet-900"
          >
            <button
              type="button"
              class="btn"
              rb-btn-variant="ghost"
              rb-btn-icon="true"
              aria-label="بستن"
              @click="emit('close')"
            >
              <Icon name="lucide:x" size="24" />
            </button>
            <span :id="titleId" class="grow">{{ title }}</span>
            <button
              v-if="showBack"
              type="button"
              class="btn"
              rb-btn-variant="ghost"
              rb-btn-icon="true"
              aria-label="بازگشت"
              @click="emit('back')"
            >
              <Icon name="lucide:arrow-left" size="24" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
