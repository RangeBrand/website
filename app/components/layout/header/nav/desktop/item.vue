<script setup lang="ts">
import type { NuxtLinkProps } from "#app"
import type { ButtonHTMLAttributes } from "vue"
import type { NavItem } from "~/types/nav"

const props = defineProps<{
  item: NavItem
}>()

const wrapperCompAttrs = computed<
  | (NuxtLinkProps & {
      is: "NuxtLink"
    })
  | (ButtonHTMLAttributes & {
      is: "button"
    })
>(() => {
  if (!props.item.children) {
    return {
      is: "NuxtLink",
      title: `دیدن ${props.item.title}`,
    }
  }
  return {
    is: "button",
    type: "button",
    title: `بازکردن ${props.item.title}`,
    "aria-expanded": childrenAreOpen.value,
    "aria-haspopup": true,
    onClick: () => toggleChildren(true),
  }
})

const childrenEl = useTemplateRef("childrenEl")
const [childrenAreOpen, toggleChildren] = useToggle(false)

onClickOutside(childrenEl, (e) => {
  if (childrenAreOpen.value) {
    toggleChildren()
    e.stopPropagation()
  }
})
</script>

<template>
  <component
    :is="wrapperCompAttrs.is"
    v-bind="{
      ...item,
      ...wrapperCompAttrs,
    }"
    rb-link-variant="ghost"
    class="link relative block px-4 py-5 after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:content-['']"
    active-class="text-rb-violet-500 after:bg-current font-bold"
  >
    {{ item.title }}
  </component>
  <Transition name="fade-in-down">
    <div
      v-if="item.children"
      v-show="childrenAreOpen"
      ref="childrenEl"
      class="absolute top-[120%] right-0 z-50 min-w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
    >
      <ul role="menu">
        <li v-for="(child, index) in item.children" :key="index">
          <NuxtLink
            v-bind="child"
            :disabled="!child.href && !child.to"
            rb-link-variant="ghost"
            class="link block px-4 py-2 hover:bg-rb-violet-100"
          >
            {{ child.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>
