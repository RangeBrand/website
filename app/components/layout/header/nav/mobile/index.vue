<script setup lang="ts">
import MobileNavItem from "./item.vue";

import { LINKS } from "@/consts/nav";

const MENU_ID = "mobile-header-nav";

const menuEl = useTemplateRef("menuEl");
const isScrollLocked = useScrollLock(window);
const [isMenuOpen, toggleMenu] = useHistorySyncedToggle(MENU_ID);
const route = useRoute();

onClickOutside(menuEl, (e) => {
  if (isMenuOpen.value) {
    toggleMenu();
    e.stopPropagation();
  }
});

watch(isMenuOpen, (newVal) => {
  isScrollLocked.value = newVal;
});

watch(route, () => {
  toggleMenu(false);
});
</script>

<template>
  <div>
    <button
      type="button"
      class="btn"
      rb-btn-size="lg"
      rb-btn-variant="ghost"
      rb-btn-icon="true"
      :aria-expanded="isMenuOpen"
      :aria-controls="MENU_ID"
      :aria-label="
        isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
      "
      @click="toggleMenu()"
    >
      <Icon name="lucide:menu" size="32" />
    </button>
    <Transition name="fade-in">
      <nav
        :id="MENU_ID"
        v-show="isMenuOpen"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs"
        aria-label="Mobile navigation"
      >
        <Transition name="slide-in-right" mode="out-in">
          <div
            v-show="isMenuOpen"
            ref="menuEl"
            class="col gap-y-3 py-3 w-2/3 h-full bg-rb-violet-100 border-l border-gray-200 shadow-lg delay-75"
          >
            <div class="mr-auto px-3">
              <button
                type="button"
                class="btn"
                rb-btn-size="lg"
                rb-btn-variant="ghost"
                rb-btn-icon="true"
                :aria-expanded="isMenuOpen"
                :aria-controls="MENU_ID"
                aria-label="Close navigation menu"
                @click="toggleMenu(false)"
              >
                <Icon name="lucide:circle-x" size="32" />
              </button>
            </div>
            <ul role="menu">
              <li v-for="(item, index) in LINKS" :key="index">
                <MobileNavItem :item />
              </li>
            </ul>
          </div>
        </Transition>
      </nav>
    </Transition>
  </div>
</template>
