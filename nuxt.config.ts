import tailwindcss from "@tailwindcss/vite";

import { SITE_DESCRIPTION, SITE_NAME } from "./shared/seo";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/fonts",
    "@nuxtjs/device",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-toast",
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      title: SITE_NAME,
      titleTemplate: `%s - ${SITE_NAME}`,
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      meta: [
        { name: "description", content: SITE_DESCRIPTION },
        { property: "og:description", content: SITE_DESCRIPTION },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      {
        name: "Vazirmatn",
        provider: "google",
        global: true,
        styles: ["normal"],
        weights: ["400 900"],
        subsets: ["arabic"],
      },
    ],
  },

  compatibilityDate: "2025-01-15",

  typescript: {
    typeCheck: true,
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["lodash-es"],
    },
  },

  toast: {
    settings: {
      rtl: true,
      position: "bottomRight",
      timeout: 1500,
      pauseOnHover: true,
      progressBar: false,
      close: false,
      animateInside: false
    },
  },
});
