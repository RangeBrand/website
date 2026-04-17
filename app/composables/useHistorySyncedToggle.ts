const OVERLAY_HISTORY_KEY = "__rbOverlay";

/**
 * Like `useToggle`, but the open state is tied to `history`: opening pushes a
 * same-URL entry so the first Back closes instead of navigating away.
 */
export function useHistorySyncedToggle(markerId: string) {
  const [isOpen, toggle] = useToggle(false);

  function hasOverlayHistoryState(): boolean {
    if (!import.meta.client) return false;
    const s = history.state;
    return (
      s != null &&
      typeof s === "object" &&
      (s as Record<string, unknown>)[OVERLAY_HISTORY_KEY] === markerId
    );
  }

  function pushOverlayHistory() {
    if (!import.meta.client) return;
    const prev =
      history.state != null && typeof history.state === "object"
        ? { ...(history.state as Record<string, unknown>) }
        : {};
    history.pushState(
      { ...prev, [OVERLAY_HISTORY_KEY]: markerId },
      "",
      window.location.href,
    );
  }

  function stripOverlayHistoryFromCurrentState() {
    if (!import.meta.client || !hasOverlayHistoryState()) return;
    const s = history.state as Record<string, unknown>;
    const next = { ...s };
    delete next[OVERLAY_HISTORY_KEY];
    history.replaceState(
      Object.keys(next).length ? next : null,
      "",
      window.location.href,
    );
  }

  function onPopState() {
    if (isOpen.value) {
      isOpen.value = false;
    }
  }

  watch(isOpen, (open, wasOpen) => {
    if (!import.meta.client) return;

    if (open) {
      pushOverlayHistory();
    } else if (wasOpen && hasOverlayHistoryState()) {
      history.back();
    }
  });

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener("popstate", onPopState);
    }
  });

  onUnmounted(() => {
    if (!import.meta.client) return;
    window.removeEventListener("popstate", onPopState);
    if (isOpen.value) {
      stripOverlayHistoryFromCurrentState();
    }
  });

  return [isOpen, toggle] as const;
}
