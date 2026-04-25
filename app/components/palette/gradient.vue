<script setup lang="ts">
import { DIRECTIONS } from "~/consts/palette";

import type { Direction } from "~/types/palette";

const props = defineProps<{
  colors: DetailedColor[];
}>();

const { copy, isSupported } = useClipboard();

const currentDirection = ref<Direction>(DIRECTIONS[0] as Direction);
const transitionDuration = 500;
const baseGradient = ref<string>("");
const overlayGradient = ref<string>("");
const isTransitioning = ref<boolean>(false);
let transitionTimeout: ReturnType<typeof setTimeout> | null = null;

const gradient = computed<string>(() => {
  return `linear-gradient(to ${currentDirection.value.cssValue}, ${props.colors
    .map((color) => color.hex.toUpperCase())
    .join(", ")});`;
});

const background = computed<string>(() => {
  return `background: ${gradient.value}`;
});

watch(
  gradient,
  (nextGradient, previousGradient) => {
    if (!previousGradient) {
      baseGradient.value = nextGradient;
      return;
    }

    if (nextGradient === previousGradient) {
      return;
    }

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
    }

    baseGradient.value = previousGradient;
    overlayGradient.value = nextGradient;
    isTransitioning.value = true;

    transitionTimeout = setTimeout(() => {
      baseGradient.value = nextGradient;
      isTransitioning.value = false;
      transitionTimeout = null;
    }, transitionDuration);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
  }
});

const copyCode = () => {
  copy(background.value)
    .then(() => {
      // TODO: add notif
      alert("copied");
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};
</script>

<template>
  <div
    class="absolute inset-0 flex group transition-all duration-700"
    :style="background"
  >
    <code
      dir="ltr"
      :class="[
        'block bg-white/20 hover:bg-white/50 group-hover:opacity-100 opacity-0 px-6 py-7 rounded-2xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-color duration-200',
        isSupported ? 'cursor-copy select-none' : 'select-all',
      ]"
      title="کپی گرادیانت"
      @click="copyCode"
    >
      {{ background }}
    </code>
    <ul
      class="flex self-end mx-auto gap-2 mb-6 group-hover:opacity-100 opacity-0 transition-opacity duration-200"
    >
      <li v-for="direction in DIRECTIONS" :key="direction.degree">
        <button
          :title="direction.cssValue"
          @click="currentDirection = direction"
          :class="[
            'btn',
            { focus: currentDirection.degree === direction.degree },
          ]"
          rb-btn-icon="true"
          rb-btn-variant="ghost"
          rb-btn-size="lg"
          :active="true"
        >
          <Icon
            name="lucide:chevron-right"
            size="20"
            :style="{
              transform: `rotate(${direction.degree}deg)`,
            }"
          />
        </button>
      </li>
    </ul>
    <!-- <div></div> -->
  </div>
</template>
<!-- <script>
import IconChevron from '~/assets/icons/chevron.svg';

export default {
    components: {
        IconChevron,
    },
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        gradDirection: 'left',
        directions: [
            {
                name: 'right',
                degree: 0,
            },
            {
                name: 'right top',
                degree: 315,
            },
            {
                name: 'top',
                degree: 270,
            },
            {
                name: 'left top',
                degree: 225,
            },
            {
                name: 'left',
                degree: 180,
            },
            {
                name: 'left bottom',
                degree: 135,
            },
            {
                name: 'bottom',
                degree: 90,
            },
            {
                name: 'right bottom',
                degree: 45,
            },
        ],
    }),
    computed: {
        gradient() {
            const value = this.colors.reduce((acc, curr, index) => {
                return `${acc}, #${curr.hex.toUpperCase()}`;
            }, this.gradDirection);
            return `linear-gradient(to ${value})`;
        },
    },
};
</script> -->
