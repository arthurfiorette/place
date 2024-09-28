import typographyPlugin from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Twemoji Country Flags', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'cream-light': '#F0DBB2',
        'cream-medium': '#E9D19F'
      }
    }
  },
  plugins: [typographyPlugin],
  darkMode: 'class'
};
