<script setup lang="ts">
import DesktopNavItem from "./item.vue";

import { LINKS } from "@/consts/nav";
</script>

<template>
  <nav aria-label="Desktop navigation">
    <ul role="menu" class="row mx-4 gap-2">
      <li v-for="(item, index) in LINKS" :key="index" class="relative">
        <DesktopNavItem :item />
      </li>
    </ul>
  </nav>
</template>
