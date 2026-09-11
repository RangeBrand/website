import { defineConfig } from "oxfmt"

export default defineConfig({
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  sortTailwindcss: {
    stylesheet: "./app/assets/css/main.css",
  },
  ignorePatterns: [
    ".nuxt/**",
    ".output/**",
    ".data/**",
    "dist/**",
    "graphify-out/**",
    "pnpm-lock.yaml",
  ],
})
