import type { NuxtLinkProps } from "#app";
import type { AnchorHTMLAttributes } from "vue";

type BaseNavItemType = NuxtLinkProps & AnchorHTMLAttributes;

export type NavItem =
  | (BaseNavItemType & { children?: never })
  | (BaseNavItemType & {
      to?: never;
      href?: never;
      children: NavItem[];
    });
