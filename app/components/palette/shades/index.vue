<script setup lang="ts">
import Button from "../footer/action/button.vue"

const paletteStore = usePaletteStore()
const { isShadesVisible } = storeToRefs(paletteStore)

const onToggle = () => {
  paletteStore.toggleShades()
}
</script>

<template>
  <div>
    <Button
      label="پرده‌ها"
      icon="hugeicons:swatch-book"
      title="نمایش پرده‌های رنگ"
      class="flex-row-reverse"
      :aria-pressed="isShadesVisible"
      @click="onToggle"
    />
  </div>
</template>
