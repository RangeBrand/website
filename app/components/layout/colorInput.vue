<script setup lang="ts">
import { isHex } from "#shared/utils/validations"

import type { Hex } from "#shared/types/common"

const props = defineProps<{
  label: string
  name: string
}>()

const model = defineModel<Hex>({ required: true })

const draft = ref<string>(model.value)

watch(model, (hex) => {
  draft.value = hex
})

const onTextInput = (value: string) => {
  draft.value = value
  const hex = (value.startsWith("#") ? value : `#${value}`) as Hex
  if (isHex(hex)) {
    model.value = hex.toUpperCase() as Hex
  }
}

const onPickerInput = (value: string) => {
  if (!isHex(value)) return
  model.value = value.toUpperCase() as Hex
}

const inputId = computed(() => `color-${props.name}`)
</script>

<template>
  <div class="col gap-2">
    <label class="text-black/80" :for="inputId">{{ label }}</label>
    <div class="relative">
      <div class="absolute size-10 top-2 right-2 pointer-events-none border border-gray-200 rounded-lg flex items-center justify-center" :style="{ backgroundColor: model }" />
      <input
        type="text"
        dir="ltr"
        maxlength="7"
        :name="`${name}-hex`"
        class="w-full rounded-lg border border-gray-200 bg-white p-4 font-bold uppercase transition-colors focus:border-gray-700 focus:outline-none"
        :value="draft"
        :aria-label="`${label} HEX`"
        @input="onTextInput(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
