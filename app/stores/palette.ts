export const usePaletteStore = defineStore("palette", () => {
  const [isIsolated, toggleIsolated] = useToggle<boolean>(false);
  const [isGradient, toggleGradient] = useToggle<boolean>(false);

  return {
    isIsolated,
    toggleIsolated,
    isGradient,
    toggleGradient,
  };
});
