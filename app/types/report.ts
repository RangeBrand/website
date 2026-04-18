import type { Color, Id } from "./common";

export type Item = {
  id: Id;
  title: string;
  link: string;
  colors: Color[];
};
