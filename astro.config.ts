// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
import compress from 'vite-plugin-compression';
import htmlMinifier from 'vite-plugin-html-minifier';

const sitemapConfig = sitemap({
  filenameBase: 'sitemap',
});

const htmlMin = htmlMinifier({
  minify: true,
});

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sharq.tech',
  integrations: [mdx(), sitemapConfig],

  // Astrso
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

    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
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

  // Astro md
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // Vercel
  adapter: vercel({
    // imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
});
