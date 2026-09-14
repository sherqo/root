// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
import compress from 'vite-plugin-compression';
import htmlMinifier from 'vite-plugin-html-minifier';
import { links } from './src/lib/links';

const redirectPaths = new Set(Object.keys(links).map(slug => `/${slug}/`));

const sitemapConfig = sitemap({
  filenameBase: 'sitemap',
  // Every route from the short-link map is a redirect, never an indexable page.
  filter: page => !redirectPaths.has(new URL(page).pathname),
});

const htmlMin = htmlMinifier({
  minify: true,
});

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sherqo.me',
  integrations: [mdx(), sitemapConfig],

  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      display: 'optional',
      fallbacks: ['sans-serif'],
    },
  ],

  // Astro
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Compressing
  compressHTML: true,

  // Vite, build, bundling
  vite: {
    plugins: [tailwindcss(), compress(), htmlMin],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      minify: 'terser',
      terserOptions: {
        format: {
          comments: false, // remove all comments
        },
      },
      rollupOptions: {
        output: {
          manualChunks: undefined, // force single chunk
        },
      },
    },
  },
});
