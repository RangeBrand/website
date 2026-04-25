<script setup lang="ts">
import { DIRECTIONS } from "~/consts/palette";

import type { Direction } from "~/types/palette";

const props = defineProps<{
  colors: DetailedColor[];
}>();

const clipboard = useClipboard();
const { success } = useToast();

const currentDirection = ref<Direction>(DIRECTIONS[0] as Direction);

const gradient = computed<string>(() => {
  return `background: linear-gradient(to ${
    currentDirection.value.cssValue
  }, ${props.colors.map((color) => color.hex.toUpperCase()).join(", ")});`;
});

const copyCode = () => {
  clipboard
    .copy(gradient.value)
    .then(() => {
      success({
        title: "گرادیانت با موفقیت کپی شد",
      });
    })
    .catch(() => {
      // TODO: let's see what's better UX
    });
};
</script>

<template>
  <div
    class="absolute inset-0 flex group transition-all duration-700"
    :style="gradient"
  >
    <code
      dir="ltr"
      :class="[
        'block bg-white/20 hover:bg-white/50 group-hover:opacity-100 opacity-0 px-6 py-7 rounded-2xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-color duration-200',
        clipboard.isSupported ? 'cursor-copy select-none' : 'select-all',
      ]"
      title="کپی گرادیانت"
      @click="copyCode"
    >
      {{ gradient }}
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
