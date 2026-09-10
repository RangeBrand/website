import { simulateColorBlindness } from "~/utils/simulateColorBlindness";
import { adjustColor } from "~/utils/adjustColor";
import { toDetailedColor } from "#shared/utils/toDetailedColor";
import { DEFAULT_COLOR_ADJUSTMENT } from "#shared/types/colorAdjustment";

import type { ColorAdjustment } from "#shared/types/colorAdjustment";
import type { ColorBlindnessType } from "#shared/types/colorBlindness";
import type { DetailedColor } from "#shared/types/common";

export const usePaletteStore = defineStore("palette", () => {
  const [isIsolated, toggleIsolated] = useToggle<boolean>(false);
  const [isGradient, toggleGradient] = useToggle<boolean>(false);

  const originalColors = ref<DetailedColor[]>([]);
  const altColors = ref<DetailedColor[]>([]);
  const colorBlindnessType = ref<ColorBlindnessType>("normal");
  const isColorBlindMode = ref(false);
  const isAdjustMode = ref(false);
  const colorAdjustment = ref<ColorAdjustment>({ ...DEFAULT_COLOR_ADJUSTMENT });

  const isPaletteAsideOpen = computed(
    () => isColorBlindMode.value || isAdjustMode.value,
  );

  const displayColors = computed(() =>
    altColors.value.length ? altColors.value : originalColors.value,
  );

  const refreshAltColors = () => {
    if (isColorBlindMode.value) {
      altColors.value = originalColors.value.map((color) =>
        toDetailedColor(
          simulateColorBlindness(color.hex, colorBlindnessType.value),
        ),
      );
      return;
    }

    if (isAdjustMode.value) {
      altColors.value = originalColors.value.map((color) =>
        adjustColor(color.hex, colorAdjustment.value),
      );
      return;
    }

    altColors.value = [];
  };

  const setOriginalColors = (colors: DetailedColor[]) => {
    originalColors.value = [...colors];
  };

  const setColorAdjustment = (next: ColorAdjustment) => {
    colorAdjustment.value = { ...next };
  };

  const applyColorBlindness = (type: ColorBlindnessType) => {
    colorBlindnessType.value = type;
    refreshAltColors();
  };

  const enterColorBlindMode = () => {
    isAdjustMode.value = false;
    colorAdjustment.value = { ...DEFAULT_COLOR_ADJUSTMENT };
    isColorBlindMode.value = true;
    refreshAltColors();
  };

  const exitColorBlindMode = () => {
    isColorBlindMode.value = false;
    colorBlindnessType.value = "normal";
    refreshAltColors();
  };

  const enterAdjustMode = () => {
    isColorBlindMode.value = false;
    colorBlindnessType.value = "normal";
    isAdjustMode.value = true;
    refreshAltColors();
  };

  const exitAdjustMode = () => {
    isAdjustMode.value = false;
    colorAdjustment.value = { ...DEFAULT_COLOR_ADJUSTMENT };
    refreshAltColors();
  };

  watch(originalColors, refreshAltColors, { deep: true });
  watch(colorAdjustment, refreshAltColors, { deep: true });

  return {
    isIsolated,
    toggleIsolated,
    isGradient,
    toggleGradient,
    originalColors,
    altColors,
    colorBlindnessType,
    isColorBlindMode,
    isAdjustMode,
    isPaletteAsideOpen,
    colorAdjustment,
    displayColors,
    setOriginalColors,
    setColorAdjustment,
    applyColorBlindness,
    enterColorBlindMode,
    exitColorBlindMode,
    enterAdjustMode,
    exitAdjustMode,
  };
});
