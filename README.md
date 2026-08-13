# Absolute Grace Properties — Homepage

Next.js 15 + TypeScript + Tailwind CSS v4 + shadcn/ui.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Notes

- Uses next/font/google for Fraunces (display serif), Inter (body), and
  IBM Plex Mono (labels/data). Requires normal internet access to Google
  Fonts on first build (works out of the box on any real machine or on
  Vercel — it only fails inside this sandboxed dev container, which has
  restricted network access).
- All copy/content lives in `src/lib/data.ts` — edit developments, FAQ,
  and contact info there rather than hunting through components.
- Images currently point to Unsplash placeholders. Swap in real property
  photos by replacing the `image` URLs in `src/lib/data.ts` and the hero
  photo in `src/components/sections/hero.tsx`.
- shadcn/ui components were hand-added (not via the CLI) since the
  ui.shadcn.com registry isn't reachable from this sandbox. To add more
  shadcn components later on your own machine, the CLI will work
  normally: `npx shadcn@latest add <component>`.
