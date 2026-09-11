import { skipHydrate } from "pinia"
import { useLocalStorage } from "@vueuse/core"

import { toDetailedColor } from "#shared/utils/toDetailedColor"

import type { Hex } from "#shared/types/common"

const STORAGE_KEY = "rb-favorite-colors"

const normalizeHex = (hex: Hex): Hex => hex.toUpperCase() as Hex

export const useFavoritesStore = defineStore("favorites", () => {
  const hexes = skipHydrate(useLocalStorage<Hex[]>(STORAGE_KEY, []))
  const [isOpen, toggleOpen] = useToggle<boolean>(false)

  const favoriteSet = computed(() => new Set(hexes.value.map((hex) => normalizeHex(hex))))

  const colors = computed(() => hexes.value.map((hex) => toDetailedColor(normalizeHex(hex))))

  const isFavorite = (hex: Hex) => favoriteSet.value.has(normalizeHex(hex))

  const removeFavorite = (hex: Hex) => {
    const key = normalizeHex(hex)
    hexes.value = hexes.value.filter((item) => normalizeHex(item) !== key)
  }

  const toggleFavorite = (hex: Hex) => {
    const key = normalizeHex(hex)
    if (isFavorite(key)) {
      removeFavorite(key)
      return
    }

    hexes.value = [...hexes.value, key]
    toggleOpen(true)
  }

  return {
    hexes,
    colors,
    isOpen,
    toggleOpen,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  }
})
