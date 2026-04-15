<script setup lang="ts">
import NavItem from "./item.vue";

import { LINKS } from "@/consts/nav";
</script>

<template>
  <nav aria-label="ناوبری اصلی">
    <ul class="row mx-4 gap-2">
      <li v-for="(item, index) in LINKS" :key="index" class="relative">
        <NavItem :item />
      </li>
    </ul>
  </nav>
</template>
