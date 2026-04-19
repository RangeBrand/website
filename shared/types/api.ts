export type Meta = {
  total_count: number;
  current_page: number;
  page_size: number;
};

export type Response<T> = {
  meta: Meta;
  items: T[];
};
