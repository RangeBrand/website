import type { NuxtLinkProps } from "#app";
import type { AnchorHTMLAttributes } from "vue";

type BaseNavItemType = Omit<NuxtLinkProps, "custom"> & AnchorHTMLAttributes;

export type NavItem =
  | (BaseNavItemType & { children?: never })
  | (BaseNavItemType & {
      to?: never;
      href?: never;
      children: NavItem[];
    });
