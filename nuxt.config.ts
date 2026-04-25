import tailwindcss from "@tailwindcss/vite";

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
      title: "رنگ برند",
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  css: ["~/assets/css/main.css"],

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
    },
  },
});
