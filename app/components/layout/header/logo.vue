<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

const props = withDefaults(
  defineProps<{
    imgClass?: string;
    noLink?: boolean;
  }>(),
  {
    imgClass: "",
    noLink: false,
  }
);

const wrapperCompAttrs = computed<
  | (NuxtLinkProps & {
      is: "NuxtLink";
    })
  | {
      is: "span";
    }
>(() => {
  if (!props.noLink) {
    return {
      is: "NuxtLink",
      to: "/",
      title: "بازگشت به خانه",
    };
  }
  return {
    is: "span",
  };
});
</script>

<template>
  <component :is="wrapperCompAttrs.is" v-bind="wrapperCompAttrs">
    <NuxtImg
      src="/favicon.png"
      alt="RangeBrand"
      :class="['size-12 block rounded-full', props.imgClass]"
      width="48"
      height="48"
    />
  </component>
</template>
