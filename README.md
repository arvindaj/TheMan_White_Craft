# White Craft Mens Salon — Next.js + Tailwind

Luxury one-page site for White Craft Mens Salon (Coimbatore), rebuilt as a real
Next.js 14 (App Router) + TypeScript + Tailwind CSS project, with Framer Motion
animations, next/image optimization, and SEO baked in.

## What's inside
- `app/layout.tsx` — global metadata, Open Graph/Twitter cards, and JSON-LD
  `HairSalon` structured data (address, founder, Instagram links) for rich
  Google results.
- `app/page.tsx` — assembles the sections below.
- `app/sitemap.ts` + `public/robots.txt` — search engine crawling files.
- `components/Hero.tsx` — parallax hero image (Sans mid-cut) with a drawn
  gold blade-line and staggered text reveal.
- `components/TheMan.tsx` — "The Man" section: Sans' portrait + founder story.
- `components/Gallery.tsx` — 4-photo "In the chair" gallery, grayscale-to-color
  on hover.
- `components/Trust.tsx` — animated count-up "10,000+" stat next to a real
  client photo.
- `components/Services.tsx`, `components/Visit.tsx`, `components/Footer.tsx`.
- `public/images/` — your real shop photos, already resized and compressed.

## Before you deploy
1. Replace `https://www.whitecraftsalon.com` in `app/layout.tsx` and
   `app/sitemap.ts` with your actual domain once you have one — this is what
   Google will index.
2. Swap `public/images/*.jpg` for higher-resolution originals if you have them;
   `next/image` will still optimize and serve responsive sizes automatically.

## Run it locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build for production
```bash
npm run build
npm run start
```

## Deploy
Push this folder to a GitHub repo and import it on
[vercel.com](https://vercel.com) (made by the Next.js team) — it deploys with
zero config. Netlify and any Node host work too.
