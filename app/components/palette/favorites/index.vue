<script setup lang="ts">
import Aside from "~/components/layout/aside.vue"
import { serializePaletteColors } from "~/utils/paletteQuery"

import type { Hex } from "#shared/types/common"

const FAVORITES_ID = "palette-favorites"

const favoritesStore = useFavoritesStore()
const paletteStore = usePaletteStore()

const { colors, isOpen } = storeToRefs(favoritesStore)
const { isColorBlindMode, isAdjustMode, isShadesVisible } = storeToRefs(paletteStore)

const clipboard = useClipboard()
const toast = useToast()

watch(isOpen, (open) => {
  if (!open) return
  paletteStore.exitColorBlindMode()
  paletteStore.exitAdjustMode()
  paletteStore.toggleShades(false)
})

watch(isColorBlindMode, (on) => {
  if (on && isOpen.value) favoritesStore.toggleOpen(false)
})

watch(isAdjustMode, (on) => {
  if (on && isOpen.value) favoritesStore.toggleOpen(false)
})

watch(isShadesVisible, (on) => {
  if (on && isOpen.value) favoritesStore.toggleOpen(false)
})

const close = () => favoritesStore.toggleOpen(false)

const palettesTo = computed(() => ({
  path: "/palette",
  query: {
    colors: serializePaletteColors(colors.value),
  },
}))

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
</script>

<template>
  <Aside :is-open="isOpen" :aside-id="FAVORITES_ID" title="رنگ‌های مورد علاقه" @close="close">
    <p v-if="colors.length === 0" class="p-8 pb-24 text-center text-black/60">
      هنوز رنگی به علاقه‌مندی‌ها اضافه نشده
    </p>
    <ul v-else class="min-h-0 grow overflow-y-auto p-4 pb-24">
      <li v-for="color in colors" :key="color.hex" class="mb-2 last:mb-0">
        <div class="flex items-center gap-2 rounded border border-black/10 bg-white">
          <button
            type="button"
            class="flex min-w-0 grow items-center gap-3 p-2 text-start"
            :class="clipboard.isSupported ? 'cursor-copy' : 'cursor-default'"
            :title="clipboard.isSupported ? 'کپی رنگ' : undefined"
            :disabled="!clipboard.isSupported"
            @click="copyCode(color.hex)"
          >
            <span
              class="size-10 shrink-0 rounded"
              :style="{ backgroundColor: color.hex }"
              aria-hidden="true"
            />
            <code dir="ltr" class="truncate font-bold uppercase">
              {{ color.hex.replace("#", "") }}
            </code>
          </button>
          <button
            type="button"
            class="btn me-2"
            rb-btn-icon="true"
            rb-btn-variant="ghost"
            title="حذف از علاقه‌مندی‌ها"
            @click.stop="favoritesStore.removeFavorite(color.hex)"
          >
            <Icon name="hugeicons:heart-check" size="20" aria-hidden="true" />
          </button>
        </div>
      </li>
    </ul>

    <div class="absolute inset-x-0 bottom-0 pb-4 text-center">
      <NuxtLink :to="palettesTo" class="btn inline-block" rb-btn-size="lg"> مشاهده </NuxtLink>
      <button type="button" class="btn" rb-btn-size="lg" rb-btn-variant="ghost" @click="close">
        بیخیال
      </button>
    </div>
  </Aside>
</template>
