<!-- TODO: Add Actions -->
<script setup lang="ts">
import { clamp } from "lodash-es";

import type { DetailedColor, Hex } from "#shared/types/common";

const colors = defineModel<DetailedColor[]>({ required: true });

const props = withDefaults(
  defineProps<{
    isolated: boolean;
    altColors?: DetailedColor[];
  }>(),
  {
    altColors: () => [],
  },
);

const clipboard = useClipboard();
const toast = useToast();
const { isDesktop } = useDevice();

const listEl = useTemplateRef<HTMLUListElement>("list");
const { width: listWidth } = useElementSize(listEl);

const activeIndex = ref<number | null>(null);
const translates = ref<number[]>([]);

let dragStartX = 0;

watch(
  colors,
  (next) => {
    translates.value = next.map(() => 0);
  },
  { immediate: true },
);

const colorCount = computed(() => colors.value.length);

const colorWidth = computed(() =>
  colorCount.value ? listWidth.value / colorCount.value : 0,
);

const colorWidthPercent = computed(() =>
  colorCount.value ? 100 / colorCount.value : 0,
);

const hasAlts = computed(
  () =>
    props.altColors.length > 0 &&
    props.altColors.length === colors.value.length,
);

const resetTranslates = () => {
  translates.value = colors.value.map(() => 0);
};

const onMovePointerDown = (event: PointerEvent, index: number) => {
  event.preventDefault();
  dragStartX = event.clientX;
  activeIndex.value = index;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
};

const onMovePointerMove = (event: PointerEvent) => {
  const from = activeIndex.value;
  if (from === null) return;

  const width = colorWidth.value;
  if (!width) return;

  const delta = event.clientX - dragStartX;
  const next = colors.value.map(() => 0);
  next[from] = delta;

  const distant = Math.round(delta / width);
  const neighbor = from - distant;
  if (distant !== 0 && neighbor in next) {
    next[neighbor] = width * Math.sign(distant) * -1;
  }

  translates.value = next;
};

const onMovePointerUp = () => {
  const from = activeIndex.value;
  if (from === null) return;

  const width = colorWidth.value;
  const distant = width ? Math.round((translates.value[from] ?? 0) / width) : 0;
  const to = clamp(from - distant, 0, colorCount.value - 1);

  if (distant !== 0 && to !== from) {
    const next = [...colors.value];
    const [moved] = next.splice(from, 1);
    if (moved) {
      next.splice(to, 0, moved);
      colors.value = next;
    }
  }

  activeIndex.value = null;
  resetTranslates();
};

useEventListener(window, "pointermove", onMovePointerMove);
useEventListener(window, "pointerup", onMovePointerUp);
useEventListener(window, "pointercancel", onMovePointerUp);

const copyCode = (hex: Hex) => {
  clipboard
    .copy(hex.toUpperCase())
    .then(() => {
      toast.success({
        message: "کپی شد",
      });
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};

const removeColor = (index: number) => {
  if (colors.value.length <= 2) return;
  const next = [...colors.value];
  next.splice(index, 1);
  colors.value = next;
};

const actionClass = (isLight: boolean) => [
  "pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full p-3 transition-colors duration-200",
  isLight
    ? "bg-black/10 text-black hover:bg-black/50"
    : "bg-white/20 text-white hover:bg-white/50",
];
</script>

<template>
  <ul
    ref="list"
    :data-isolated="isolated"
    :data-dragging="activeIndex !== null"
    :data-split="hasAlts"
  >
    <li
      v-for="(color, index) in colors"
      :key="`${color.hex}-${index}`"
      :class="[
        'group',
        !hasAlts && (color.isLight ? 'text-black/80' : 'text-white/80'),
        index === activeIndex ? 'z-50' : 'z-0 transition-transform duration-200',
      ]"
      :style="{
        backgroundColor: hasAlts ? undefined : color.hex,
        width: `${colorWidthPercent}%`,
        insetInlineStart: `${colorWidthPercent * index}%`,
        transform: `translateX(${translates[index] ?? 0}px)`,
      }"
    >
      <template v-if="hasAlts && altColors[index]">
        <div
          class="flex h-1/2 items-end justify-center"
          :class="
            altColors[index].isLight ? 'text-black/80' : 'text-white/80'
          "
          :style="{ backgroundColor: altColors[index].hex }"
        >
          <code dir="ltr">
            {{ altColors[index].hex.replace("#", "") }}
          </code>
        </div>
        <div
          class="flex h-1/2 items-end justify-center"
          :class="color.isLight ? 'text-black/80' : 'text-white/80'"
          :style="{ backgroundColor: color.hex }"
        >
          <code dir="ltr">
            {{ color.hex.replace("#", "") }}
          </code>
        </div>
      </template>
      <code v-else dir="ltr">
        {{ color.hex.replace("#", "") }}
      </code>
      <div
        v-if="
          !hasAlts && (clipboard.isSupported || isDesktop || colorCount > 2)
        "
        class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 pb-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <button
          v-if="colorCount > 2"
          type="button"
          :class="actionClass(color.isLight)"
          title="حذف رنگ"
          @click="removeColor(index)"
        >
          <Icon name="lucide:trash-2" size="24" aria-hidden="true" />
        </button>
        <button
          v-if="isDesktop"
          type="button"
          :class="[
            actionClass(color.isLight),
            activeIndex === index ? 'cursor-grabbing' : 'cursor-grab',
          ]"
          title="جابه‌جایی رنگ"
          @pointerdown="onMovePointerDown($event, index)"
        >
          <Icon name="lucide:move" size="24" aria-hidden="true" />
        </button>
        <button
          v-if="clipboard.isSupported"
          type="button"
          :class="actionClass(color.isLight)"
          title="کپی رنگ"
          @click="copyCode(color.hex)"
        >
          <Icon name="lucide:copy" size="24" aria-hidden="true" />
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
@reference "~/assets/css/main.css";

ul {
  @apply relative flex h-full overflow-hidden bg-white uppercase;

  &[data-isolated="true"] {
    @apply p-2;
    & > li {
      @apply overflow-hidden rounded-lg;
    }
  }

  &[data-dragging="true"] {
    @apply cursor-grabbing select-none;
  }

  &[data-split="true"] li {
    @apply flex-col items-stretch justify-stretch;
  }
}

li {
  @apply absolute inset-y-0 flex items-end justify-center;
}

code {
  @apply block select-none p-2 text-xl font-bold uppercase;
}
</style>
