## my personal site :)

### Stack

- **Astro v5** - Static site generator with islands architecture
- **Preact v10** - Lightweight React alternative
- **MDX** - Markdown with JSX components support
- **Bun** - Fast JavaScript runtime and package manager
- **Vercel** - Deployment
- **Tailwind v4** - CSS utility framework
- **TypeScript**

### Architecture

- **File-based routing** - Pages in `src/pages/` become routes
- **Content collections** - Blog posts managed with Astro's content system
- **Hybrid approach** - `.astro` files for static content, `.tsx` for interactive components
- **Static generation** - Everything builds to pure HTML/CSS/JS

### Fonts

- **Inter Variable** - Main text and UI (`@fontsource-variable/inter`)
- **Lora** - The logo (`@fontsource/lora`)

### Development

```bash
bun install      # Install dependencies
bun run dev      # Start dev server
bun run build    # Build for production to /dist
bun run preview  # Preview production build locally
bun run start    # Build and preview in one command
```

### Code Quality & Formatting

```bash
bun run format       # Format all files with Prettier
bun run format:check # Check if files are formatted correctly
bun run lint         # Lint code with ESLint
bun run lint:fix     # Auto-fix linting issues
```

### Deployment

```bash
bun run deploy       # Deploy to Vercel (preview)
bun run deploy:prod  # Deploy to Vercel (production)
```

### Project Structure

```
src/
├── pages/           # File-based routing
├── layouts/         # Page layouts
├── components/      # Reusable components
├── content/         # Content collections
│   ├── config.ts         # Content collection configuration
│   └── journal/          # Blog posts in MDX format
├── lib/             # Utility functions
└── styles/          # Global CSS
```

---

Astro [view transitions](https://docs.astro.build/en/guides/view-transitions/) is used  
the `<ClientRouter />` are in main `<head>` in **RootLayout.astro**.  
the `<main>` are `transition:animate="initial"` in **PageLayout.astro**.  
the NavBar are `transition:persist` in **NavBar.astro**.

That's it.
