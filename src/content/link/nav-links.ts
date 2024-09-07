import type { LinkProps } from "../../types/link";

export const NavLinks: LinkProps[] = [
  {
    id: 1,
    label: "Landing",
    title: "View Landing.",
    href: "/",
    icon: "mdi:home-variant",
  },
  {
    id: 2,
    label: "Posts",
    title: "View Posts.",
    href: "#posts",
    icon: "mdi:post-outline",
  },
  {
    id: 3,
    label: "Curriculum",
    title: "View Curriculum.",
    href: "#account",
    icon: "mdi:account-file-outline",
  },
];
