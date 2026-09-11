<script setup lang="ts">
import { DIRECTIONS } from "~/consts/palette"

import type { Direction } from "~/types/palette"

const props = defineProps<{
  colors: DetailedColor[]
}>()

const clipboard = useClipboard()
const toast = useToast()

const currentDirection = ref<Direction>(DIRECTIONS[0] as Direction)

const gradient = computed<string>(() => {
  return `background: linear-gradient(to ${
    currentDirection.value.cssValue
  }, ${props.colors.map((color) => color.hex.toUpperCase()).join(", ")});`
})

const copyCode = () => {
  clipboard
    .copy(gradient.value)
    .then(() => {
      toast.success({
        message: "گرادیانت با موفقیت کپی شد",
      })
    })
    .catch(() => {
      // TODO: let's see what's better UX
    })
}
</script>

<template>
  <div class="group absolute inset-0 flex transition-all duration-700" :style="gradient">
    <code
      dir="ltr"
      :class="[
        'transition-color absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/20 px-6 py-7 text-center opacity-0 duration-200 group-hover:opacity-100 hover:bg-white/50',
        clipboard.isSupported ? 'cursor-copy select-none' : 'select-all',
      ]"
      title="کپی گرادیانت"
      @click="copyCode"
    >
      {{ gradient }}
    </code>
    <ul
      class="mx-auto mb-6 flex gap-2 self-end opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <li v-for="direction in DIRECTIONS" :key="direction.degree">
        <button
          :title="direction.cssValue"
          @click="currentDirection = direction"
          :class="['btn', { focus: currentDirection.degree === direction.degree }]"
          rb-btn-icon="true"
          rb-btn-variant="ghost"
          rb-btn-size="lg"
          :active="true"
        >
          <Icon
            name="hugeicons:arrow-right-01"
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
