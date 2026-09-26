<!-- TODO: Add Actions -->
<script setup lang="ts">
import { clamp } from "lodash-es"

import { generateColorShades } from "~/utils/generateColorShades"
import { mixHexMidpoint } from "~/utils/mixHexMidpoint"
import { toDetailedColor } from "#shared/utils/toDetailedColor"

import type { DetailedColor, Hex } from "#shared/types/common"

const colors = defineModel<DetailedColor[]>({ required: true })

const props = withDefaults(
  defineProps<{
    isolated: boolean
    showShades?: boolean
    altColors?: DetailedColor[]
  }>(),
  {
    showShades: false,
    altColors: () => [],
  },
)

const clipboard = useClipboard()
const toast = useToast()
const { isDesktop } = useDevice()
const favoritesStore = useFavoritesStore()

const listEl = useTemplateRef<HTMLUListElement>("list")
const { width: listWidth } = useElementSize(listEl)

const activeIndex = ref<number | null>(null)
const translates = ref<number[]>([])

let dragStartX = 0
let dragDeltaX = 0
let activeColumnEl: HTMLElement | null = null
let shiftedNeighbor: number | null = null

watch(
  colors,
  (next) => {
    translates.value = next.map(() => 0)
  },
  { immediate: true },
)

const colorCount = computed(() => colors.value.length)

const colorWidth = computed(() => (colorCount.value ? listWidth.value / colorCount.value : 0))

const colorWidthPercent = computed(() => (colorCount.value ? 100 / colorCount.value : 0))

const hasAlts = computed(
  () => props.altColors.length > 0 && props.altColors.length === colors.value.length,
)

const showShadeStack = computed(() => props.showShades && !hasAlts.value)

const resetTranslates = () => {
  translates.value = colors.value.map(() => 0)
}

const onMovePointerDown = (event: PointerEvent, index: number) => {
  event.preventDefault()
  dragStartX = event.clientX
  dragDeltaX = 0
  shiftedNeighbor = null
  activeColumnEl = (event.currentTarget as HTMLElement).closest("li")
  activeIndex.value = index
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

const onMovePointerMove = (event: PointerEvent) => {
  const from = activeIndex.value
  if (from === null) return

  const width = colorWidth.value
  if (!width) return

  dragDeltaX = event.clientX - dragStartX
  if (activeColumnEl) {
    activeColumnEl.style.setProperty("--drag-x", `${dragDeltaX}px`)
  }

  const distant = Math.round(dragDeltaX / width)
  const neighbor = from - distant
  const nextNeighbor = distant !== 0 && neighbor in colors.value ? neighbor : null
  if (nextNeighbor === shiftedNeighbor) return

  const next = colors.value.map(() => 0)
  if (nextNeighbor !== null) {
    next[neighbor] = width * Math.sign(distant) * -1
  }

  shiftedNeighbor = nextNeighbor
  translates.value = next
}

const onMovePointerUp = () => {
  const from = activeIndex.value
  if (from === null) return

  const width = colorWidth.value
  const distant = width ? Math.round(dragDeltaX / width) : 0
  const to = clamp(from - distant, 0, colorCount.value - 1)

  if (distant !== 0 && to !== from) {
    const next = [...colors.value]
    const [moved] = next.splice(from, 1)
    if (moved) {
      next.splice(to, 0, moved)
      colors.value = next
    }
  }

  activeColumnEl?.style.removeProperty("--drag-x")
  activeColumnEl = null
  dragDeltaX = 0
  shiftedNeighbor = null
  activeIndex.value = null
  resetTranslates()
}

useEventListener(window, "pointermove", onMovePointerMove)
useEventListener(window, "pointerup", onMovePointerUp)
useEventListener(window, "pointercancel", onMovePointerUp)

const copyCode = (hex: Hex) => {
  clipboard
    .copy(hex.toUpperCase())
    .then(() => {
      toast.success({
        message: "کپی شد",
      })
    })
    .catch(() => {
      // TODO: let's see what's better UX
    })
}

const removeColor = (index: number) => {
  if (colors.value.length <= 1) return
  const next = [...colors.value]
  next.splice(index, 1)
  colors.value = next
}

const insertColor = (index: number) => {
  const left = colors.value[index - 1]
  const right = colors.value[index]
  if (!left || !right) return
  const next = [...colors.value]
  next.splice(index, 0, toDetailedColor(mixHexMidpoint(left.hex, right.hex)))
  colors.value = next
}

const showInsertGutters = computed(
  () => colorCount.value > 1 && activeIndex.value === null && !showShadeStack.value,
)

const actionClass = (isLight: boolean) => [
  "pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full p-3 transition-colors duration-200",
  isLight ? "bg-black/10 text-black hover:bg-black/50" : "bg-white/20 text-white hover:bg-white/50",
]
</script>

<template>
  <ul
    ref="list"
    :data-isolated="isolated"
    :data-dragging="activeIndex !== null"
    :data-split="hasAlts"
    :data-shades="showShadeStack"
  >
    <li
      v-for="(color, index) in colors"
      :key="`${color.hex}-${index}`"
      :class="[
        'group',
        !hasAlts && (color.isLight ? 'text-black/80' : 'text-white/80'),
        index === activeIndex ? 'z-50 transition-none' : 'z-0 transition-transform duration-200',
      ]"
      :style="{
        backgroundColor: hasAlts ? undefined : color.hex,
        width: `${colorWidthPercent}%`,
        insetInlineStart: `${colorWidthPercent * index}%`,
        transform:
          index === activeIndex
            ? 'translate3d(var(--drag-x, 0px), 0, 0)'
            : `translateX(${translates[index] ?? 0}px)`,
        transition: index === activeIndex ? 'none' : undefined,
      }"
    >
      <template v-if="hasAlts && altColors[index]">
        <div
          class="flex h-1/2 items-end justify-center"
          :class="altColors[index].isLight ? 'text-black/80' : 'text-white/80'"
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
      <Transition name="fade-in">
        <div v-if="showShadeStack" class="absolute inset-0 z-20 flex flex-col">
          <div
            v-for="shade in generateColorShades(color)"
            :key="shade.hex"
            class="group/shade relative flex min-h-0 flex-1 items-center justify-center"
            :class="[
              shade.isLight ? 'text-black/80' : 'text-white/80',
              shade.hex.toUpperCase() === color.hex.toUpperCase() && 'border-t-4 border-white',
            ]"
            :style="{ backgroundColor: shade.hex }"
          >
            <code
              v-if="shade.hex.toUpperCase() !== color.hex.toUpperCase()"
              dir="ltr"
              class="p-0 text-sm transition-opacity duration-200 group-hover/shade:opacity-0"
            >
              {{ shade.hex.replace("#", "") }}
            </code>
            <button
              v-if="clipboard.isSupported && shade.hex.toUpperCase() !== color.hex.toUpperCase()"
              type="button"
              :class="[
                'absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover/shade:opacity-100',
              ]"
              title="کپی رنگ"
              @click="copyCode(shade.hex)"
            >
              <span :class="actionClass(shade.isLight)">
                <Icon name="hugeicons:copy-01" size="20" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </Transition>
      <div
        v-if="!hasAlts && !showShadeStack"
        class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 pb-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <button
          v-if="colorCount > 1"
          type="button"
          :class="actionClass(color.isLight)"
          title="حذف رنگ"
          @click="removeColor(index)"
        >
          <Icon name="hugeicons:delete-02" size="24" aria-hidden="true" />
        </button>
        <button
          v-if="isDesktop && colorCount > 1"
          type="button"
          :class="[
            actionClass(color.isLight),
            activeIndex === index ? 'cursor-grabbing' : 'cursor-grab',
          ]"
          title="جابه‌جایی رنگ"
          @pointerdown="onMovePointerDown($event, index)"
        >
          <Icon name="hugeicons:drag-drop" size="24" aria-hidden="true" />
        </button>
        <button
          v-if="clipboard.isSupported"
          type="button"
          :class="actionClass(color.isLight)"
          title="کپی رنگ"
          @click="copyCode(color.hex)"
        >
          <Icon name="hugeicons:copy-01" size="24" aria-hidden="true" />
        </button>
        <button
          type="button"
          :class="actionClass(color.isLight)"
          :title="
            favoritesStore.isFavorite(color.hex)
              ? 'حذف از علاقه‌مندی‌ها'
              : 'افزودن به علاقه‌مندی‌ها'
          "
          :aria-pressed="favoritesStore.isFavorite(color.hex)"
          @click.stop="favoritesStore.toggleFavorite(color.hex)"
        >
          <Icon
            :name="
              favoritesStore.isFavorite(color.hex) ? 'hugeicons:heart-check' : 'hugeicons:heart'
            "
            size="24"
            aria-hidden="true"
          />
        </button>
      </div>
    </li>
    <div
      v-for="index in showInsertGutters ? colorCount - 1 : 0"
      :key="`insert-${index}`"
      class="absolute inset-y-0 z-30 -ms-5 flex w-10 items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100"
      :style="{ insetInlineStart: `${colorWidthPercent * index}%` }"
    >
      <button
        type="button"
        title="افزودن رنگ"
        class="btn"
        rb-btn-icon="true"
        rb-btn-size="lg"
        @click.stop="insertColor(index)"
      >
        <Icon name="hugeicons:add-01" size="20" aria-hidden="true" />
      </button>
    </div>
  </ul>
</template>

<style scoped>
@reference "~/assets/css/main.css";

ul {
  @apply relative flex h-full overflow-hidden bg-white uppercase;

  &[data-isolated="true"] {
    @apply p-2;

    & > li {
      @apply overflow-hidden rounded-xl border-4 p-2;
    }
  }

  &[data-dragging="true"] {
    @apply cursor-grabbing select-none;
  }

  &[data-split="true"] li,
  &[data-shades="true"] li {
    @apply flex-col items-stretch justify-stretch;
  }

  &[data-shades="true"] code {
    @apply origin-center;
  }
}

li {
  @apply absolute inset-y-0 flex items-end justify-center border-0 border-white transition-all;
}

code {
  @apply block p-2 font-bold uppercase select-none max-md:origin-center max-md:-translate-y-8 max-md:-rotate-90 md:text-xl;
}
</style>
