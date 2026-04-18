<script setup lang="ts">
import Header from "~/components/layout/header/index.vue";
</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto col gap-y-4 py-8 px-3 sm:px-0">
      <slot />
    </main>
  </div>
</template>
