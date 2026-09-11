<script setup lang="ts">
import type { DropdownItem } from "~/types/dropdown"

withDefaults(
  defineProps<{
    position?: "top" | "bottom"
    items: DropdownItem[]
  }>(),
  {
    position: "bottom",
  },
)

const el = useTemplateRef("el")
const [isOpen, toggle] = useToggle(false)

onClickOutside(el, () => {
  if (isOpen.value) {
    toggle()
  }
})
</script>

<template>
  <div ref="el" class="relative">
    <slot
      name="activator"
      v-bind="{
        on: { click: () => toggle() },
        isOpen: isOpen,
      }"
    />
    <Transition :name="position === 'top' ? 'fade-in-up' : 'fade-in-down'">
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 min-w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg',
          position === 'top' ? 'bottom-[120%]' : 'top-[120%]',
        ]"
      >
        <ul role="menu" class="text-sm">
          <slot name="before-items" />
          <li v-for="item in items" :key="item.label">
            <button
              class="link block w-full px-2 py-2 text-right hover:bg-rb-violet-100"
              rb-link-variant="ghost"
              @click="
                () => {
                  item.onClick()
                }
              "
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
