export const usePaletteStore = defineStore("palette", () => {
  const [isIsolated, toggleIsolated] = useToggle<boolean>(false);

  return {
    isIsolated,
    toggleIsolated,
  };
});
