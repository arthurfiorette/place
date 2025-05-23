import type { LinkProps } from '../../types/link';

export const SocialMediaLinks: LinkProps[] = [
  {
    id: 1,
    label: 'Github',
    title: 'Star my projects on Github.',
    href: 'https://github.com/arthurfiorette',
    icon: 'mdi:github'
  },
  {
    id: 2,
    label: 'Twitter',
    title: 'Like some of my tweets.',
    href: 'https://x.com/arthurfiorette',
    icon: 'ri:twitter-x-fill'
  },
  {
    id: 3,
    label: 'LinkedIn',
    title: 'Connect with me on LinkedIn.',
    href: 'https://linkedin.com/in/arthurfiorette',
    icon: 'mdi:linkedin'
  },
  {
    id: 4,
    label: 'Twitch',
    title: 'Follow me on Twitch.',
    href: 'https://twitch.tv/arthurfiorette',
    icon: 'mdi:twitch'
  },
  {
    id: 5,
    label: 'Mail',
    title: 'Send me an email.',
    href: 'mailto:me@arthur.place',
    icon: 'mdi:at'
  },
  {
    id: 6,
    label: 'Bluesky',
    title: 'Follow me on Bluesky.',
    href: 'https://bsky.app/profile/arthur.place',
    icon: 'ri:bluesky-fill'
  }
];
