import { defineNuxtPlugin } from "#app";
import { NuxtLink } from "#components";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("NuxtLink", NuxtLink);
});
