# Agent instructions

This repo is a **rewrite** of [rangebrand.ir](https://rangebrand.ir): Persian, RTL (`lang="fa"`, `dir="rtl"` in `nuxt.config.ts`), curated Iranian brand colors. Human setup lives in `README.md`. Package manager is **pnpm**.

## Rewrite, do not copy

The old product lives at [RangeBrand/RangeBrand `src/`](https://github.com/RangeBrand/RangeBrand/tree/main/src): **Gridsome 0.7 + Vue 2 Options API + Vuex + JavaScript + Tailwind 2**.

Use that source for **features, copy, routes, and UX**. Do **not** port Options API, Vuex, Gridsome APIs, file names, or CSS wholesale. Reimplement with Nuxt 4, Vue 3 `<script setup lang="ts">`, Pinia, Tailwind v4, and the current `app/` layout.

Legacy pages (product spec; map to Nuxt routes, ignore Gridsome casing): Home, About, Brands list, brand detail, Colors, Palette, Contrast checker.

Shipped so far: `/`, `/about`, `/brands`, `/brands/[id]`, `/colors`. Missing pieces (e.g. contrast checker) should be new implementations when asked, using the old pages as UX reference only.

## TypeScript always

- New files: `.ts` or `.vue` with `<script setup lang="ts">`. No new `.js` except configs that must stay JS (e.g. `eslint.config.mjs`).
- Typed `defineProps` / `defineEmits` and typed `defineEventHandler` returns. Shared types in `shared/types/` (`#shared/types/...`). Avoid `any`.
- Keep `typescript.typeCheck: true` in `nuxt.config.ts`.
- Use Nuxt auto-imports; do not re-import `useFetch`, `defineStore`, etc. unless needed for types.

## Vue, Nuxt, frontend

Match this repo, not Vue 2 / Gridsome:

- Nuxt 4 `app/` directory: pages, components, layouts, composables, stores. Nitro routes in `server/api/`.
- Composition API; pages use `definePageMeta` / `useSeoMeta` (see `app/pages/brands/[id].vue`).
- Pinia setup stores (`app/stores/palette.ts`).
- RTL: keep `dir="rtl"`; Persian UI copy; no English placeholders unless the user writes English.
- Small components colocated by feature (`app/components/palette/`, `layout/`, `report/`).
- Data: `useFetch` and Nitro handlers. Do not recreate Gridsome filesystem JSON plugins unless we design a real dataset.

### VueUse

`@vueuse/nuxt` is installed; composables are auto-imported. Before writing a custom composable, timer, observer, storage helper, debounce, or toggle, **read and follow** [`.agents/skills/vueuse-functions/SKILL.md`](.agents/skills/vueuse-functions/SKILL.md). Honor each function’s `Invocation` (`AUTO` vs `EXTERNAL` vs `EXPLICIT_ONLY`) and its `./references` notes. Example: `useToggle` in `app/stores/palette.ts`.

### lodash-es

For collection/object utilities (`pick`, `uniq`, `groupBy`, `cloneDeep`, etc.), **import named functions from `lodash-es`** (see `server/api/brands/index.ts`). Do not write one-off helpers. Prefer VueUse in Vue for debounce/throttle (`useDebounceFn`, `useThrottleFn`); use lodash-es for **data transforms**, especially on the server.

### Tailwind only

No new CSS: no `<style>` blocks, CSS modules, Sass, or extra `.css` files. New UI uses Tailwind v4 utilities in templates. Existing globals stay: `app/assets/css/main.css`, `theme.css` tokens, `components.css` shared `@layer` (`.btn`, `.link`, `.row`). Extend those layers only for a **reused** primitive—not one-off styles.

For utilities, variants, and v4 config, **read and follow** [`.agents/skills/tailwind-4-docs/SKILL.md`](.agents/skills/tailwind-4-docs/SKILL.md). If `references/docs/` is missing, use that skill’s init/fallback (`gotchas.md` / `engineering-playbook.md`); do not guess v3 class names. RTL: logical utilities (`ms`/`me`, `ps`/`pe`, `start`/`end`), not left/right copies of the old site.

## Graphify (search and keep current)

`graphify-out/graph.json` already exists.

**Search:** for “where is X”, “how does Y work”, “what calls Z”, architecture, or file relationships, **query the graph before Grep/Glob/Explore**:

```bash
graphify query "<question>"
```

Do not rebuild the graph to answer a question. Use `graphify path "A" "B"` for shortest path and `graphify explain "Node"` for one node. Cite `source_location` from graph output when pointing at files. Fall back to Grep/Glob only if graphify is unavailable or returns nothing useful.

**Update:** after you add, edit, rename, or delete files in a session, **always** refresh the graph before you finish. Prefer the code-only command (AST, no API key):

```bash
graphify update .
```

If markdown/docs in the product corpus changed and a valid LLM backend is configured, run `graphify extract . --update` (or `graphify . --update`). Do not index vendored skills (see `.graphifyignore`).

Do not install the git hook unless asked.

## Nuxt MCP (Nuxt docs, not this repo)

When changing Nuxt APIs, modules, directory conventions, rendering, or upgrades, use the Nuxt MCP (`user-nuxt`) before guessing. Prefer Nuxt **4.x** docs (`/docs/4.x/...`).

- `list-documentation-pages` (search, `version: "4.x"`) then `get-documentation-page`
- `get-module` / `list-modules` for modules in `nuxt.config.ts`
- `get-changelog` when version behavior may have changed

Do not invent module config from memory.
