<script setup lang="ts">
import Logo from "~/components/layout/header/logo.vue"
import DesktopNav from "~/components/layout/header/nav/desktop/index.vue"
import MobileNav from "~/components/layout/header/nav/mobile/index.vue"
</script>

<template>
  <header class="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-rb-violet-100">
    <div class="relative container mx-auto px-3 sm:px-0">
      <div class="flex flex-row-reverse items-center justify-between md:flex-row md:justify-start">
        <Logo class="-mr-2 block justify-self-center p-2" />
        <DesktopNav class="hidden md:block" />
        <MobileNav class="md:hidden" />
      </div>
    </div>
  </header>
</template>
