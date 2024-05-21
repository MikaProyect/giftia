import { wedgesTW } from "@lemonsqueezy/wedges";

/ @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src//.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    'node_modules/@lemonsqueezy/wedges/dist/**/.{js,ts,jsx,tsx}',
  ],
  theme: {},
  darkMode: "class",
  plugins: [wedgesTW()],
};

export default config;
