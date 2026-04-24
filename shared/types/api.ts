import type { DetailedColor } from "./common";

export type ListMeta = {
  total_count: number;
  current_page: number;
  page_size: number;
};

export type ListResponse<T> = {
  meta: ListMeta;
  items: T[];
};

export type DetailResponse = {
  title: string;
  content: string[];
  colors: DetailedColor[];
};
