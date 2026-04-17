<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { NavItem } from "@/types/nav";
import type { NuxtLinkProps } from "#app";

const props = defineProps<{
  item: NavItem;
}>();

const wrapperCompAttrs = computed<
  | (NuxtLinkProps & {
      is: "NuxtLink";
    })
  | (HTMLAttributes & {
      is: "span";
    })
>(() => {
  if (!props.item.children) {
    return {
      is: "NuxtLink",
      title: `دیدن ${props.item.title}`,
    };
  }
  return {
    is: "span",
  };
});
</script>

<template>
  <component
    :is="wrapperCompAttrs.is"
    v-bind="{
      ...item,
      ...wrapperCompAttrs,
    }"
    rb-link-variant="ghost"
    class="link px-4 py-2 relative block after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-1 after:rounded-full"
    active-class="text-rb-violet-500 after:bg-current font-bold"
  >
    {{ item.title }}
  </component>
  <ul v-if="item.children" class="pl-4 pr-5">
    <li v-for="(child, index) in item.children" :key="index">
      <NuxtLink
        v-bind="child"
        :disabled="!child.href || !child.to"
        rb-link-variant="ghost"
        class="link block px-2 py-1 hover:bg-rb-violet-100 text-sm"
      >
        {{ child.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
