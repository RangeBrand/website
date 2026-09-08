<script setup lang="ts">
import Button from "../footer/action/button.vue";
import Dialog from "~/components/layout/dialog.vue";
import Url from "./url.vue";
import ExportImage from "./image.vue";
import Code from "./code.vue";
import type { DetailedColor } from "#shared/types/common";

const EXPORT_ID = "palette-export";

defineProps<{
  colors: DetailedColor[];
  originalColors: DetailedColor[];
}>();

type ExportStep = "main" | "code";

const route = useRoute();
const isScrollLocked = useScrollLock(window);
const [isOpen, toggle] = useHistorySyncedToggle(EXPORT_ID);
const step = ref<ExportStep>("main");

const dialogTitle = computed(() =>
  step.value === "main" ? "خروجی از این پالت رنگی" : "Codeهای این پالت رنگی",
);

watch(isOpen, (open) => {
  isScrollLocked.value = open;
  if (!open) {
    step.value = "main";
  }
});

watch(route, () => {
  toggle(false);
});

const close = () => toggle(false);
</script>

<template>
  <div>
    <Button
      label="خروجی"
      icon="lucide:share-2"
      title="خروجی از این پالت رنگی"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-controls="EXPORT_ID"
      @click="toggle()"
    />
    <Dialog
      :is-open="isOpen"
      :dialog-id="EXPORT_ID"
      :title="dialogTitle"
      :show-back="step !== 'main'"
      @close="close"
      @back="step = 'main'"
    >
      <ul
        v-show="step === 'main'"
        class="flex flex-wrap items-center justify-center gap-2 py-12 text-center font-bold text-black/80"
      >
        <Url @close="close" />
        <ExportImage :colors :original-colors="originalColors" @close="close" />
        <Code :colors @open="step = 'code'" />
      </ul>
      <Code v-show="step === 'code'" :colors show-snippet />
    </Dialog>
  </div>
</template>
