<script setup lang="ts">
import Header from "~/components/layout/header/index.vue"
import Footer from "~/components/layout/footer.vue"
import Main from "~/components/layout/main/index.vue"

const props = withDefaults(
  defineProps<{
    wrapperClass?: string
    wrapperTag?: keyof HTMLElementTagNameMap
  }>(),
  {
    wrapperClass: "min-h-screen",
  },
)

const wrapper = computed(() => props.wrapperTag ?? Main)
</script>

<template>
  <div>
    <Header />
    <component :is="wrapper" :class="wrapperClass">
      <slot />
    </component>
    <Footer />
  </div>
</template>
