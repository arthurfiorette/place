import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Twemoji Country Flags', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [typographyPlugin],
  darkMode: 'class'
};
