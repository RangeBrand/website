<script setup lang="ts">
import { range } from "lodash-es";

import type { ListMeta } from "#shared/types/api";

const props = defineProps<{
  meta: ListMeta;
}>();

const route = useRoute();

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.meta.total_count / props.meta.page_size)),
);

const currentPage = computed(() => props.meta.current_page);

const pages = computed(() => {
  const count = pageCount.value;
  const current = currentPage.value;
  if (count <= 7) return range(1, count + 1);

  const radius = 2;
  const start = Math.max(1, current - radius);
  const end = Math.min(count, current + radius);
  return range(start, end + 1);
});

const listBase = computed(() =>
  route.path.replace(/\/+$/, "").replace(/\/\d+$/, ""),
);

const pageLink = (page: number) =>
  page <= 1 ? listBase.value : `${listBase.value}/${page}`;

const pageClass =
  "flex size-12 mx-2 items-center justify-center rounded-full border border-transparent hover:border-rb-violet-500";
</script>

<template>
  <nav
    class="mt-4 py-4"
    :class="{ 'border-t border-gray-200': pageCount > 1 }"
    aria-label="صفحه‌بندی"
  >
    <ul class="flex list-none items-center justify-center">
      <li>
        <NuxtLink
          v-if="currentPage > 1"
          :to="pageLink(currentPage - 1)"
          class="link"
          :class="pageClass"
          rb-link-variant="ghost"
          aria-label="صفحه قبل"
        >
          <Icon name="lucide:chevron-right" size="16" aria-hidden="true" />
        </NuxtLink>
        <span
          v-else
          :class="[pageClass, 'text-black/80 pointer-events-none opacity-60']"
          aria-disabled="true"
          aria-label="صفحه قبل"
        >
          <Icon name="lucide:chevron-right" size="16" aria-hidden="true" />
        </span>
      </li>
      <li v-for="page in pages" :key="page">
        <span
          v-if="page === currentPage"
          :class="[pageClass, 'bg-rb-violet-500 text-white hover:border-transparent']"
          aria-current="page"
        >
          {{ page }}
        </span>
        <NuxtLink
          v-else
          :to="pageLink(page)"
          class="link"
          :class="pageClass"
          rb-link-variant="ghost"
        >
          {{ page }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          v-if="currentPage < pageCount"
          :to="pageLink(currentPage + 1)"
          class="link"
          :class="pageClass"
          rb-link-variant="ghost"
          aria-label="صفحه بعد"
        >
          <Icon name="lucide:chevron-left" size="16" aria-hidden="true" />
        </NuxtLink>
        <span
          v-else
          :class="[pageClass, 'text-black/80 pointer-events-none opacity-60']"
          aria-disabled="true"
          aria-label="صفحه بعد"
        >
          <Icon name="lucide:chevron-left" size="16" aria-hidden="true" />
        </span>
      </li>
    </ul>
  </nav>
</template>
