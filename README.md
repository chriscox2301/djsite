# MHENNEKE — one-page site

One-page website for hardcore DJ/producer MHENNEKE. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where to edit

- **Content** (bio, gigs, mix, genre tags, social links, booking email): `data/site.ts`. Every value marked `PLACEHOLDER` is dummy data.
- **Colours / fonts (design tokens)**: the `@theme` block in `app/globals.css`.
- **Images**: `public/images/`. The current files are procedurally generated placeholders (`node scripts/generate-placeholders.mjs`). Replace them with real photos using the same filenames.

## Structure

```
app/            layout.tsx (fonts, metadata), page.tsx (section order), globals.css (tokens, grain, glitch)
components/     Navbar, Logo, SocialLinks, Hero, HeroSlides, MixPlayer, Waveform,
                GigsList, AtmosphereCard, AboutCard, ContactSection, Card, ButtonLink, icons
data/site.ts    all content
scripts/        placeholder image generator
```
