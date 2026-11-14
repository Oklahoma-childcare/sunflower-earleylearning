# Sunflower Early Learning Center - Website source

Five-page responsive React + TypeScript + Vite + TanStack Router + Tailwind website. The original sunflower color palette, logo, typography and layouts are preserved.

## Start

1. Install Node.js 22+ and npm.
2. Run **npm install** (this source archive does not include a lockfile).
3. Run **npm run dev** to preview the website.
4. Run **npm run build** to create Cloudflare Pages assets under **dist/**.

## Photos and social profiles

- Edit **src/lib/photos.json** to change any of the seven images. Use a remote https URL or a local file like **/photos/hero.webp**, stored under **public/photos/**. The current photos are *real-life but illustrative*; they are **not** photos of Sunflower itself.
- Edit **src/lib/social-links.json** for Facebook, Instagram or YouTube. Leave blank URLs empty.
- See **PHOTO-GUIDE.md** for photo links, licenses and replacements.
- Images are visible in local preview without enabling publication approval. No photo permission claim is made by the website.

## Publishing and SEO

The preview looks complete but remains **noindex** until authorized by the actual organization. To publish, verify the center's details, obtain permission to use its name/brand and actual facility photographs, and configure **.env.local** with the approved domain and approval flags. Do not enable publication based only on generic illustrative photos. The generator checks for at least one local approved photo before enabling indexing.

**Do not use filters/crops to attempt to remove copyright protection.** Keep written photo permission and, where identifiable children appear, applicable consent documentation.

Run **node scripts/build-html.mjs** whenever you change photos, profile links, or static SEO details, unless you use **npm run dev/build**, which runs it automatically.

## SEO features

Route-specific pre-rendered HTML, titles/descriptions, JSON-LD ChildCare data, mobile layouts, semantic content, sitemap and robots configuration, local contact links and responsive images. Final SEO verification requires a real authorized domain and live performance testing.
