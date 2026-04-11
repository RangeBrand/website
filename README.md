# RangeBrand website

Marketing site for [RangeBrand](https://github.com/RangeBrand) (رنگ برند): a curated view of brand colors commonly seen in Iran, to help teams pick better palette choices. The live site is served from [rangebrand.ir](https://rangebrand.ir).

## Stack

- [Nuxt 4](https://nuxt.com/) with the `app/` directory layout
- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) (build-time type checking enabled in `nuxt.config.ts`)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [Nuxt modules](https://nuxt.com/modules): `@nuxt/eslint`, `@nuxt/hints`, `@nuxt/image`, `@nuxt/scripts`, `@nuxt/fonts`, `@nuxtjs/device`, `@vueuse/nuxt`

The HTML document is configured for Persian content: `lang="fa"` and `dir="rtl"` in `nuxt.config.ts`. Global styles live under `app/assets/css/` (`main.css` imports Tailwind, `theme.css` for design tokens, `components.css` for shared utility classes such as `.btn` and `.link`).

## Prerequisites

- A current [Node.js](https://nodejs.org/) LTS release

This repo includes a `pnpm-lock.yaml`; [pnpm](https://pnpm.io/) is the expected package manager.

## Setup

```bash
pnpm install
```

`postinstall` runs `nuxt prepare` so local tooling (including ESLint via `eslint.config.mjs`) can resolve generated `.nuxt` config.

## Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `pnpm dev`     | Development server (default: `localhost:3000`)   |
| `pnpm build`   | Production build                                 |
| `pnpm preview` | Serve the production build locally               |
| `pnpm generate` | Static site generation (`nuxt generate`)       |

## Project layout

```
app/
  app.vue              # Root shell: NuxtLayout + NuxtPage
  assets/css/          # Tailwind entry + theme + component layers
  components/home/     # Home page sections (e.g. hero)
  layouts/             # `default`, `empty` (home uses `empty`)
  pages/               # File-based routes (`index.vue` → `/`)
public/                # Static files, `CNAME` for GitHub Pages-style hosting
```

## Linting

ESLint is wired through `@nuxt/eslint` and `eslint.config.mjs` (extends the generated `.nuxt/eslint.config.mjs`). Run it with your editor integration or `pnpm exec eslint .` if you add a dedicated script later.

## Further reading

- [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment)
