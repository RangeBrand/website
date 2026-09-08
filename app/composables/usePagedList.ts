import type { ListResponse } from "#shared/types/api";
import type { Item } from "#shared/types/report";

export async function usePagedList(url: string) {
  const route = useRoute();
  const page = computed(() => {
    const raw = route.params.page;
    const n = Number(Array.isArray(raw) ? raw[0] : raw);
    return Number.isInteger(n) && n > 0 ? n : 1;
  });

  const { data } = await useFetch<ListResponse<Item>>(url, {
    key: computed(() => `paged:${url}:${page.value}`),
    query: { page },
  });

  return {
    page,
    items: computed(() => data.value?.items || []),
    meta: computed(() => data.value?.meta),
  };
}
