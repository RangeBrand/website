import type { Color } from "./common";

export type Brand = {
  title: string;
  description: string;
  path: string;
  long_description?: string;
  colors: Color[];
  updated_at: String;
  tags: string[];
};
