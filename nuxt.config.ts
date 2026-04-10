// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/scripts",
    "@nuxtjs/device",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      title: "رنگ برند",
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-01-15",

  typescript: {
    typeCheck: true,
  },
});
