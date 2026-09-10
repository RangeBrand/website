import { simulateColorBlindness } from "~/utils/simulateColorBlindness";
import { toDetailedColor } from "#shared/utils/toDetailedColor";

import type { ColorBlindnessType } from "#shared/types/colorBlindness";
import type { DetailedColor } from "#shared/types/common";

export const usePaletteStore = defineStore("palette", () => {
  const [isIsolated, toggleIsolated] = useToggle<boolean>(false);
  const [isGradient, toggleGradient] = useToggle<boolean>(false);

  const originalColors = ref<DetailedColor[]>([]);
  const altColors = ref<DetailedColor[]>([]);
  const colorBlindnessType = ref<ColorBlindnessType>("normal");
  const isColorBlindMode = ref(false);

  const displayColors = computed(() =>
    altColors.value.length ? altColors.value : originalColors.value,
  );

  const refreshAltColors = () => {
    if (!isColorBlindMode.value) {
      altColors.value = [];
      return;
    }

    altColors.value = originalColors.value.map((color) =>
      toDetailedColor(
        simulateColorBlindness(color.hex, colorBlindnessType.value),
      ),
    );
  };

  const setOriginalColors = (colors: DetailedColor[]) => {
    originalColors.value = [...colors];
  };

  const applyColorBlindness = (type: ColorBlindnessType) => {
    colorBlindnessType.value = type;
    refreshAltColors();
  };

  const enterColorBlindMode = () => {
    isColorBlindMode.value = true;
    refreshAltColors();
  };

  const exitColorBlindMode = () => {
    isColorBlindMode.value = false;
    colorBlindnessType.value = "normal";
    refreshAltColors();
  };

  watch(originalColors, refreshAltColors, { deep: true });

  return {
    isIsolated,
    toggleIsolated,
    isGradient,
    toggleGradient,
    originalColors,
    altColors,
    colorBlindnessType,
    isColorBlindMode,
    displayColors,
    setOriginalColors,
    applyColorBlindness,
    enterColorBlindMode,
    exitColorBlindMode,
  };
});
