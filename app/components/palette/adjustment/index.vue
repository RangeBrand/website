<script setup lang="ts">
import { clamp } from "lodash-es"

import Button from "../footer/action/button.vue"
import Aside from "~/components/layout/aside.vue"

import { ADJUSTMENT_FIELDS } from "~/consts/colorAdjustment"
import { serializePaletteColors } from "~/utils/paletteQuery"

import type { ColorAdjustment } from "#shared/types/colorAdjustment"
import { useFavoritesStore } from "~/stores/favorites.ts"

const ADJUST_ID = "palette-color-adjust"

const paletteStore = usePaletteStore()
const { altColors, colorAdjustment, isColorBlindMode, isShadesVisible } = storeToRefs(paletteStore)
const { isOpen: isFavoritesOpen } = storeToRefs(useFavoritesStore())

const [isOpen, toggle] = useHistorySyncedToggle(ADJUST_ID)

watch(isOpen, (open) => {
  if (open) {
    paletteStore.enterAdjustMode()
    return
  }
  paletteStore.exitAdjustMode()
})

watch(isColorBlindMode, (on) => {
  if (on && isOpen.value) toggle(false)
})

watch(isShadesVisible, (on) => {
  if (on && isOpen.value) toggle(false)
})

watch(isFavoritesOpen, (on) => {
  if (on && isOpen.value) toggle(false)
})

const close = () => toggle(false)

const palettesTo = computed(() => ({
  path: "/palette",
  query: {
    colors: serializePaletteColors(altColors.value),
  },
}))

const onFieldInput = (key: keyof ColorAdjustment, raw: string, min: number, max: number) => {
  const parsed = Number(raw)
  const value = Number.isFinite(parsed) ? clamp(parsed, min, max) : 0
  paletteStore.setColorAdjustment({
    ...colorAdjustment.value,
    [key]: value,
  })
}
</script>

<template>
  <div>
    <Button
      label="تنظیم رنگ‌ها"
      icon="lucide:settings-2"
      title="تنظیم رنگ‌ها"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-controls="ADJUST_ID"
      class="flex-row-reverse"
      @click="toggle()"
    />
    <Aside :is-open="isOpen" :aside-id="ADJUST_ID" title="تنظیم رنگ‌ها" @close="close">
      <ul class="min-h-0 grow overflow-y-auto p-4 pb-24" dir="ltr">
        <li
          v-for="field in ADJUSTMENT_FIELDS"
          :key="field.key"
          class="mb-6 border-b border-black/10 pb-4 text-center text-black/80 last:mb-0 last:border-b-0"
        >
          <label class="mb-2 block text-lg" :for="`adjust-${field.key}`">
            {{ field.label }}
          </label>
          <input
            :id="`adjust-${field.key}`"
            type="range"
            class="mb-2 w-full accent-rb-violet-500"
            :min="field.min"
            :max="field.max"
            :value="colorAdjustment[field.key]"
            @input="
              onFieldInput(
                field.key,
                ($event.target as HTMLInputElement).value,
                field.min,
                field.max,
              )
            "
          />
          <input
            type="number"
            class="w-full rounded border border-gray-200 bg-white p-2 text-center"
            :min="field.min"
            :max="field.max"
            :value="colorAdjustment[field.key]"
            @input="
              onFieldInput(
                field.key,
                ($event.target as HTMLInputElement).value,
                field.min,
                field.max,
              )
            "
          />
        </li>
      </ul>
      <div class="absolute inset-x-0 bottom-0 pb-4 text-center">
        <NuxtLink :to="palettesTo" class="btn inline-block" rb-btn-size="lg"> اعمال </NuxtLink>
        <button
          type="button"
          class="btn"
          rb-btn-size="lg"
          rb-btn-variant="ghost"
          @click="close"
        >
          بیخیال
        </button>
      </div>
    </Aside>
  </div>
</template>
