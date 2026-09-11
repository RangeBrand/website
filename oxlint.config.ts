import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "vue"],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [".nuxt/**", ".output/**", ".data/**", "dist/**", "graphify-out/**"],
  categories: {
    correctness: "error",
  },
  rules: {
    "no-debugger": "error",
    "typescript/no-explicit-any": "error",
  },
})
