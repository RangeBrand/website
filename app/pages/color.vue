<script setup lang="ts">
import { clamp } from "lodash-es"
import colorConvert from "color-convert"

import { COLOR_DESCRIPTION } from "#shared/seo"
import { isLight } from "#shared/utils/validations"

import type { Hex } from "#shared/types/common"

definePageMeta({
  middleware: "full-bleed-layout",
})

type Channel = "red" | "green" | "blue"

const CHANNELS = [
  { key: "red", label: "قرمز" },
  { key: "green", label: "سبز" },
  { key: "blue", label: "آبی" },
] as const satisfies ReadonlyArray<{ key: Channel; label: string }>

const rgb = reactive<Record<Channel, number>>({
  red: 0,
  green: 0,
  blue: 0,
})

const hex = computed(() => `#${colorConvert.rgb.hex([rgb.red, rgb.green, rgb.blue])}` as Hex)

const textIsLight = computed(() => isLight(hex.value))

const clipboard = useClipboard()
const toast = useToast()

const onChannelInput = (key: Channel, event: Event) => {
  const value = (event.target as HTMLInputElement).value
  rgb[key] = clamp(Number.parseInt(value, 10) || 0, 0, 255)
}

const copyHex = () => {
  if (!clipboard.isSupported) return
  clipboard
    .copy(hex.value.toUpperCase())
    .then(() => {
      toast.success({
        message: "کپی شد",
      })
    })
    .catch(() => {
      // TODO: let's see what's better UX
    })
}

useSeoMeta({
  title: "تبدیل RGB به HEX",
  description: COLOR_DESCRIPTION,
  ogDescription: COLOR_DESCRIPTION,
})
</script>

<template>
  <main
    class="flex h-screen w-full items-center justify-center transition-colors"
    :class="textIsLight ? 'text-black' : 'text-white'"
    :style="{ backgroundColor: hex }"
  >
    <div dir="ltr">
      <button
        type="button"
        class="block w-full py-8 text-center font-mono text-6xl font-bold opacity-30 transition-opacity hover:opacity-90"
        :class="clipboard.isSupported ? 'cursor-copy' : 'cursor-default'"
        :disabled="!clipboard.isSupported"
        :title="clipboard.isSupported ? 'کپی رنگ' : undefined"
        @click="copyHex"
      >
        {{ hex }}
      </button>
      <div class="flex flex-wrap gap-3">
        <div v-for="channel in CHANNELS" :key="channel.key" class="col">
          <label :for="`color-${channel.key}`" class="block text-lg font-bold">
            {{ channel.label }}
          </label>
          <input
            :id="`color-${channel.key}`"
            type="number"
            :name="channel.key"
            min="0"
            max="255"
            class="w-64 rounded-xl bg-white p-4 font-mono text-black"
            :value="rgb[channel.key]"
            :aria-label="channel.label"
            @input="onChannelInput(channel.key, $event)"
          />
        </div>
      </div>
    </div>
  </main>
</template>
