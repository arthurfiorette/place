import type { LinkProps } from "../../types/link";

export const SocialMediaLinks: LinkProps[] = [
  {
    id: 1,
    label: "Curriculum",
    title: "View my Curriculum.",
    href: "./curriculum",
    icon: "mdi:account-file-outline",
  },
  {
    id: 2,
    label: "Github",
    title: "Star my projects on Github.",
    href: "https://github.com/arthurfiorette",
    icon: "mdi:github",
  },
  {
    id: 3,
    label: "Twitter",
    title: "Like some of my tweets.",
    href: "https://twitter.com/arthurfiorette",
    icon: "mdi:twitter",
  },
  {
    id: 4,
    label: "LinkedIn",
    title: "Connect with me on LinkedIn.",
    href: "https://linkedin.com/in/arthurfiorette",
    icon: "mdi:linkedin",
  },
  {
    id: 5,
    label: "Twitch",
    title: "Follow me on Twitch.",
    href: "https://twitch.tv/arthurfiorette",
    icon: "mdi:twitch",
  },
  {
    id: 6,
    label: "Mail",
    title: "Send me an email.",
    href: "mailto:me@arthur.place",
    icon: "mdi:at",
  },
];
