import { clamp, slice } from "lodash-es";

import type { ListResponse } from "#shared/types/api";
import type { H3Event } from "h3";

const DEFAULT_PAGE_SIZE = 100;
const MAX_PAGE_SIZE = 500;

function toPositiveInt(value: unknown, fallback: number): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) return fallback;
  return n;
}

export function paginate<T>(event: H3Event, items: T[]): ListResponse<T> {
  const query = getQuery(event);
  const pageSize = clamp(
    toPositiveInt(query.page_size, DEFAULT_PAGE_SIZE),
    1,
    MAX_PAGE_SIZE,
  );
  const totalCount = items.length;
  const lastPage = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = clamp(toPositiveInt(query.page, 1), 1, lastPage);
  const start = (currentPage - 1) * pageSize;

  return {
    meta: {
      total_count: totalCount,
      current_page: currentPage,
      page_size: pageSize,
    },
    items: slice(items, start, start + pageSize),
  };
}
