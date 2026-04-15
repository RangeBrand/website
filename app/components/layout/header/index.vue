<script setup lang="ts">
import Logo from "@/components/layout/header/logo.vue";
import DesktopNav from "@/components/layout/header/nav/desktop/index.vue";

const { isMobile } = useDevice();
</script>

<template>
  <header
    class="sticky z-50 top-0 inset-x-0 bg-rb-violet-100 border-b border-gray-200"
  >
    <div class="max-w-7xl mx-auto px-3 sm:px-4 relative">
      <div class="flex items-center">
        <div>
          <Logo class="p-2 block" />
        </div>
        <DesktopNav v-if="!isMobile" />
      </div>
    </div>
  </header>
</template>
